import { useTelegram } from "@providers";
import { currentUnixTimestamp } from "@utils";
import { Dispatch, ElementRef, FC, SetStateAction, memo, useEffect, useRef } from "react";
import { GameConfig, GameState, Item, tokensPool } from "../../config";
import styles from "./styles.module.css";

type Props = {
    gameEndAt: number,
    magnetEndAt: number,
    setMagnetEndAt: Dispatch<SetStateAction<number>>,
    gameState: GameState,
    setGameState: Dispatch<SetStateAction<GameState>>,
    addPendingScore: (score: number) => any
}

const CanvasContent: FC<Props> = ({
    gameState, setGameState, addPendingScore, gameEndAt, magnetEndAt, setMagnetEndAt
}) => {
    const { triggerHapticFeedback } = useTelegram()

    const ref = useRef<ElementRef<"canvas">>(null)
    const heroRef = useRef<ElementRef<"canvas">>(null)
    const sliderRef = useRef<ElementRef<"button">>(null)

    const items = useRef<Item[]>([])
    const width = useRef(document.body.clientWidth - 32)
    const height = useRef(document.body.clientHeight - 32)
    const heroX = useRef(54)
    const isHeroActive = useRef(false)
    const isHeroEating = useRef(false)
    const baseMoveYValue = useRef(Math.floor(1 / 300 * height.current))
    const heroYBottomPadding = useRef(Math.floor(height.current * 15 / 100))
    const gameEndAtRef = useRef(gameEndAt)
    const magnetEndAtRef = useRef(magnetEndAt)

    useEffect(() => {
        gameEndAtRef.current = gameEndAt
    }, [gameEndAt])

    useEffect(() => {
        magnetEndAtRef.current = magnetEndAt
    }, [magnetEndAt])

    useEffect(() => {
        triggerHapticFeedback({ type: "impact", impact_style: "heavy" })
    }, [])

    useEffect(() => {
        const listener = () => {
            width.current = document.body.clientWidth - 32
            height.current = document.body.clientHeight - 32
        }
        window.addEventListener("resize", listener)
        return () => {
            window.removeEventListener("resize", listener)
        }
    }, [])

    useEffect(() => {
        baseMoveYValue.current = Math.floor(1 / 300 * height.current)
        heroYBottomPadding.current = Math.floor(height.current * 15 / 100)
    }, [height.current])

    useEffect(() => {
        if (gameState !== GameState.Play) return 
        const canvas = ref.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let frame: number

        const animatePoints = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            for (let item of items.current) {
                ctx.drawImage(item.createImg(), item.x, item.y)
            }
            
            frame = requestAnimationFrame(animatePoints)
        }
        
        animatePoints()
        
        return () => cancelAnimationFrame(frame)
    }, [gameState, ref.current])


    useEffect(() => {
        if (gameState !== GameState.Play && gameState !== GameState.Bomb && gameState !== GameState.TimeExpired) return 
        const canvas = heroRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let frame: number

        const animateHero = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            const slider = new Image(60, 40)
            slider.src = 'game-items/slider.svg'
            const hero = new Image(60, 60)

            if (gameState === GameState.Bomb) {
                hero.src = 'game-items/hero_blown.svg'
            } else if (gameState === GameState.TimeExpired) {
                hero.src = 'game-items/hero_thug.svg'
            } else if (magnetEndAtRef.current - currentUnixTimestamp() > 0) {
                if (isHeroEating.current) {
                    hero.src = 'game-items/hero_swallow_magnet.svg'
                } else {
                    hero.src = 'game-items/hero_open_magnet.svg'
                }
            } else {
                if (isHeroEating.current) {
                    hero.src = 'game-items/hero_swallow.svg'
                } else {
                    hero.src = 'game-items/hero_open.svg'
                }
            }

            ctx.drawImage(hero, heroX.current, 0, 60, 60)
            ctx.drawImage(slider, heroX.current, 60)
            
            frame = requestAnimationFrame(animateHero)
        }
        
        animateHero()
        
        return () => cancelAnimationFrame(frame)
    }, [gameState, heroRef.current])
    
    useEffect(() => {
        if (gameState !== GameState.Play) return 
        function moveItems () {
            let baseMoveY = baseMoveYValue.current;
            const currentTimestamp = currentUnixTimestamp();
            const timeLeft = gameEndAtRef.current - currentTimestamp;
            if (timeLeft <= 40) baseMoveY += 1;
            if (timeLeft <= 20) baseMoveY += 1;
            const isMagnetActive = magnetEndAtRef.current - currentTimestamp > 0;
            const heroXCurrent = heroX.current;
            const heroWidth = heroXCurrent + 60;
            const heroBottom = height.current - heroYBottomPadding.current - 40;
            const heroTop = heroBottom - 60;
            const magnetZoneTop = heroTop - 60;

            const moved = items.current.reduce<Item[]>((acc, item) => {
                item = item.moveY(baseMoveY);

                if (item.y > height.current) return acc;

                if (isMagnetActive && item.y >= magnetZoneTop && Math.abs(heroXCurrent - item.x) <= 100) {
                    item = item.moveX(heroXCurrent + 16 - item.x > 0 ? 1 : -1);
                }

                const itemCenterX = item.x + 14
                const itemCenterY = item.y + 14
                const itemWithinHeroX = itemCenterX > heroXCurrent && itemCenterX < heroWidth;
                const itemWithinHeroY = itemCenterY > heroTop && itemCenterY < heroBottom;
                 
                if (itemWithinHeroX && itemWithinHeroY) {
                    if (item.isBomb) {
                        setGameState(GameState.Bomb);
                        triggerHapticFeedback({ type: "impact", impact_style: "heavy" });
                        return acc;
                    }

                    if (isHeroActive.current) {
                        isHeroEating.current = true;
                        setTimeout(() => isHeroEating.current = false, 200)

                        if (item.reward) {
                            addPendingScore(item.reward);
                            triggerHapticFeedback({
                                type: "impact",
                                impact_style: item.reward > 0 ? "light" : "heavy",
                            });
                        }

                        if (item.isMagnet) {
                            setMagnetEndAt(currentUnixTimestamp() + GameConfig.magnetDuration);
                            triggerHapticFeedback({ type: "impact", impact_style: "medium" });
                        }

                        return acc;
                    }
                }

                acc.push(item);
                return acc;
            }, []);

            items.current = moved;
        }
        const interval = setInterval(moveItems, 10)
        return () => clearInterval(interval)
    }, [gameState])

    
    useEffect(() => {
        if (gameState !== GameState.Play) return 
        let interval = setInterval(addItem, 600)

        function addItem () {
            const seed = Math.floor(Math.random() * 99)
            const x = Math.floor(Math.random() * (width.current - 28))
            const item = tokensPool[seed](x)
            items.current.push(item)

            const timeLeft = gameEndAtRef.current - currentUnixTimestamp();
            if (timeLeft === 20) {
                clearInterval(interval)
                interval = setInterval(addItem, 200)
            } else if (timeLeft === 40) {
                clearInterval(interval)
                interval = setInterval(addItem, 400)
            }
        }

        return () => clearInterval(interval)
    }, [gameState])

    useEffect(() => {
        if (gameState !== GameState.Play && gameState !== GameState.TimeExpired) return
        
        function onMove (e: TouchEvent) {
            const lastTouch = e.touches.item(e.touches.length - 1)
            if (!lastTouch) return
            let x = lastTouch.clientX
            if (x < 46) x = 46
            if (x > width.current - 16) x = width.current - 16
            heroX.current = x - 46
            if (sliderRef.current) {
                sliderRef.current.style.left = `${heroX.current}px`
            }
        }

        function onStart () {
            isHeroActive.current = true
            sliderRef.current?.addEventListener("touchmove", onMove)
        }
        function onEnd () {
            isHeroActive.current = false
            sliderRef.current?.removeEventListener("touchmove", onMove)
        }

        sliderRef.current?.addEventListener("touchstart", onStart)
        sliderRef.current?.addEventListener("touchend", onEnd)

        function clean () {
            sliderRef.current?.removeEventListener("touchmove", onMove)
            sliderRef.current?.removeEventListener("touchstart", onStart)
            sliderRef.current?.removeEventListener("touchend", onEnd)
        }

        return () => clean()
    }, [gameState])


    return (
        <>
            <canvas className={styles.hero_canvas} height={100} width={width.current} style={{ bottom: `${heroYBottomPadding.current}px` }} ref={heroRef}/>
            <button className={styles.slider} style={{ left: `${heroX.current}px`, bottom: `${heroYBottomPadding.current}px` }} ref={sliderRef}/>
            <canvas className={styles.canvas} width={width.current} height={height.current} ref={ref}/>
        </>
    )
}

export const Canvas = memo(CanvasContent)