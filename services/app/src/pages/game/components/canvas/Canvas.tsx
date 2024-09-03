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

const HERO_SIZE = 60;
const ITEM_SIZE = 28;
const SLIDER_HEIGHT = 40;
const CANVAS_PADDING = 32;

const CanvasContent: FC<Props> = ({
    gameState, setGameState, addPendingScore, gameEndAt, magnetEndAt, setMagnetEndAt
}) => {
    const { triggerHapticFeedback } = useTelegram()

    const ref = useRef<ElementRef<"canvas">>(null)
    const heroRef = useRef<ElementRef<"canvas">>(null)
    const sliderRef = useRef<ElementRef<"button">>(null)

    const items = useRef<Item[]>([])
    const width = useRef(document.body.clientWidth - CANVAS_PADDING)
    const height = useRef(document.body.clientHeight - CANVAS_PADDING)
    const heroX = useRef(54)
    const isHeroActive = useRef(false)
    const isHeroEating = useRef(false)
    const heroYBottomPadding = useRef(Math.floor(height.current * 15 / 100))
    const gameEndAtRef = useRef(gameEndAt)
    const magnetEndAtRef = useRef(magnetEndAt)
    const cachedImagesRef = useRef<Map<string, HTMLCanvasElement>>(new Map())

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
            width.current = document.body.clientWidth - CANVAS_PADDING
            height.current = document.body.clientHeight - CANVAS_PADDING
        }
        window.addEventListener("resize", listener)
        return () => {
            window.removeEventListener("resize", listener)
        }
    }, [])

    useEffect(() => {
        heroYBottomPadding.current = Math.floor(height.current * 15 / 100)
    }, [height.current])

    useEffect(() => {
        const sources = [
            { width: HERO_SIZE, height: HERO_SIZE, src: 'hero_blown' },
            { width: HERO_SIZE, height: HERO_SIZE, src: 'hero_thug' },
            { width: HERO_SIZE, height: HERO_SIZE, src: 'hero_swallow_magnet' },
            { width: HERO_SIZE, height: HERO_SIZE, src: 'hero_open_magnet' },
            { width: HERO_SIZE, height: HERO_SIZE, src: 'hero_swallow' },
            { width: HERO_SIZE, height: HERO_SIZE, src: 'hero_open' },
            { width: HERO_SIZE, height: SLIDER_HEIGHT, src: 'slider' },
            { width: ITEM_SIZE, height: ITEM_SIZE, src: 'gold' },
            { width: ITEM_SIZE, height: ITEM_SIZE, src: 'ufo' },
            { width: ITEM_SIZE, height: ITEM_SIZE, src: 'durov' },
            { width: ITEM_SIZE, height: ITEM_SIZE, src: 'rocket' },
            { width: ITEM_SIZE, height: ITEM_SIZE, src: 'dollar' },
            { width: ITEM_SIZE, height: ITEM_SIZE, src: 'magnet' },
            { width: ITEM_SIZE, height: ITEM_SIZE, src: 'bomb' }
        ]

        for (let { width, height, src } of sources) {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx = canvas.getContext("2d")
            const img = new Image(width, height)
            img.src = `game-items/${src}.svg`
            img.onload = () => {
                ctx!.drawImage(img, 0, 0, width, height)
                cachedImagesRef.current.set(`game-items/${src}.svg`, canvas)
            }
        }

        return () => {
            cachedImagesRef.current.forEach(m => m.remove())
        }
    }, [])

    useEffect(() => {
        if (gameState !== GameState.Play) return
        const canvas = ref.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let frame: number

        const animatePoints = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

            for (let item of items.current) {
                const cachedImage = cachedImagesRef.current.get(item.src)
                if (cachedImage) {
                    ctx.drawImage(cachedImage, item.x, item.y)
                }
            }

            frame = requestAnimationFrame(animatePoints)
        }

        animatePoints()

        return () => cancelAnimationFrame(frame)
    }, [gameState, ref.current])

    useEffect(() => {
        if (gameState !== GameState.Play && gameState !== GameState.Bomb && gameState !== GameState.TimeExpired) return;

        const canvas = heroRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frame: number;

        const animateHero = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            let heroKey: string;
            if (gameState === GameState.Bomb) {
                heroKey = 'hero_blown'
            } else if (gameState === GameState.TimeExpired) {
                heroKey = 'hero_thug'
            } else if (magnetEndAtRef.current - currentUnixTimestamp() > 0) {
                heroKey = isHeroEating.current ? 'hero_swallow_magnet' : 'hero_open_magnet'
            } else {
                heroKey = isHeroEating.current ? 'hero_swallow' : 'hero_open'
            }

            const hero = cachedImagesRef.current.get(`game-items/${heroKey}.svg`)
            const slider = cachedImagesRef.current.get('game-items/slider.svg')
            if (hero) ctx.drawImage(hero, heroX.current, 0);
            if (slider) ctx.drawImage(slider, heroX.current, HERO_SIZE);

            frame = requestAnimationFrame(animateHero);
        };

        animateHero();

        return () => cancelAnimationFrame(frame);
    }, [gameState, heroRef.current]);

    useEffect(() => {
        if (gameState !== GameState.Play) return;

        let frame: number;
        let lastTimestamp = performance.now();
        let lastAt = lastTimestamp;

        const animate = (timestamp: number) => {
            const elapsed = timestamp - lastAt;

            let interval = 600;
            let baseMoveY = 3;
            const currentTimestamp = currentUnixTimestamp();
            const timeLeft = gameEndAtRef.current - currentTimestamp;
            if (timeLeft <= 40) {
                interval = 400;
                baseMoveY += 1;
            }
            if (timeLeft <= 20) {
                interval = 200;
                baseMoveY += 1;
            }

            const isMagnetActive = magnetEndAtRef.current - currentTimestamp > 0;
            const heroXCurrent = heroX.current;
            const heroWidth = heroXCurrent + HERO_SIZE;
            const heroBottom = height.current - heroYBottomPadding.current - SLIDER_HEIGHT;
            const heroTop = heroBottom - HERO_SIZE;
            const magnetZoneTop = heroTop - HERO_SIZE;

            items.current = items.current.reduce<Item[]>((acc, item) => {
                item = item.moveY(baseMoveY);

                if (item.y > height.current) return acc;

                if (isMagnetActive && item.y >= magnetZoneTop && Math.abs(heroXCurrent - item.x) <= 100) {
                    item = item.moveX(heroXCurrent + 16 - item.x > 0 ? 1 : -1);
                }

                const itemCenterX = item.x + ITEM_SIZE / 2;
                const itemCenterY = item.y + ITEM_SIZE / 2;
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
                        setTimeout(() => isHeroEating.current = false, 200);

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

            if (elapsed >= interval) {
                const seed = Math.floor(Math.random() * 99);
                const x = Math.floor(Math.random() * (width.current - ITEM_SIZE));
                const item = tokensPool[seed](x);
                items.current.push(item);

                lastAt = timestamp;
            }

            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frame);
            items.current = [];
        };
    }, [gameState]);

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