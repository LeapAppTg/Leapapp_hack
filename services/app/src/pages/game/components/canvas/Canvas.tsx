import { GameSlider } from "@components";
import { useTelegram } from "@providers";
import { ElementRef, FC, useEffect, useMemo, useRef, useState } from "react";
import { GameConfig, Item, tokensPool } from "../../config";
import { GameState, useGame } from "../../providers";
import styles from "./styles.module.css";

export const Canvas: FC = () => {

    const { gameState, setGameState, addPendingScore, setMagnetTimeLeft, magnetTimeLeft, timeLeft } = useGame()
    const { triggerHapticFeedback } = useTelegram()

    const ref = useRef<ElementRef<"canvas">>(null)
    const sliderRef = useRef<ElementRef<"button">>(null)
    
    const [items, setItems] = useState<Item[]>([])

    const width = useRef(document.body.clientWidth - 32)
    const height = useRef(document.body.clientHeight - 32)
    const heroX = useRef(54)
    const isHeroActive = useRef(false)
    const isHeroEating = useRef(false)
    const baseMoveYValue = useRef(Math.floor(1 / 300 * height.current))
    const heroYBottomPadding = useRef(Math.floor(height.current * 15 / 100))
    const speedModifier = useRef(0)
    const magnetTimeLeftRef = useRef(0)
    

    useEffect(() => {
        if (timeLeft <= 20) {
            if (speedModifier.current !== 2) speedModifier.current = 2
        } else if (timeLeft <= 40) {
            if (speedModifier.current !== 1) speedModifier.current = 1
        }
    }, [timeLeft])

    useEffect(() => {
        magnetTimeLeftRef.current = magnetTimeLeft
    }, [magnetTimeLeft])

    useEffect(() => {
        const timeout = setTimeout(() => isHeroEating.current = false, 200)
        return () => clearInterval(timeout)
    }, [isHeroEating.current])

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
        if (gameState !== GameState.Play && gameState !== GameState.Bomb && gameState !== GameState.TimeExpired) return 
        const canvas = ref.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let frame: number

        const animatePoints = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            const slider = new Image()
            slider.src = 'game-items/slider.svg'
            const hero = new Image()

            if (gameState === GameState.Bomb) {
                hero.src = 'game-items/hero_blown.svg'
            } else if (gameState === GameState.TimeExpired) {
                hero.src = 'game-items/hero_thug.svg'
            } else if (magnetTimeLeftRef.current) {
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

            ctx.drawImage(hero, heroX.current, ctx.canvas.height - heroYBottomPadding.current - 100, 60, 60)
            ctx.drawImage(slider, heroX.current, ctx.canvas.height - heroYBottomPadding.current - 40, 60, 40)

            if (gameState === GameState.Play) {

                for (let item of items) {
                    ctx.drawImage(item.createImg(), item.x, item.y)
                }
            }
            
            frame = requestAnimationFrame(animatePoints)
        }
        
        animatePoints()
        
        return () => cancelAnimationFrame(frame)
    }, [gameState, items, ref.current])
    
    useEffect(() => {
        if (gameState !== GameState.Play) return 
        function moveItems () {
            setItems(prev => {
                if (prev.length === 0) return prev
                let moved = prev.map(i => i.moveY(baseMoveYValue.current + speedModifier.current)).filter(i => i.y <= height.current)
                if (magnetTimeLeftRef.current) moved = moved.map(i => i.y >= height.current - heroYBottomPadding.current - 160 && Math.abs(heroX.current - i.x) <= 100 ? i.moveX(heroX.current + 16 - i.x > 0 ? 1 : -1) : i)
                const updated: Item[] = []
                for (let item of moved) {
                    if (item.y + 14 > height.current - heroYBottomPadding.current - 100 && item.y + 14 < height.current - heroYBottomPadding.current - 40 && item.x + 14 > heroX.current && item.x + 14 < heroX.current + 60) {
                        if (item.isBomb) {
                            setGameState(GameState.Bomb)
                            triggerHapticFeedback({ type: "impact", impact_style: "heavy" })
                        }
                        else if (isHeroActive.current) {
                            if (item.reward) {
                                isHeroEating.current = true
                                addPendingScore(item.reward)
                                if (item.reward > 0) {
                                    triggerHapticFeedback({ type: "impact", impact_style: "light" })
                                } else {
                                    triggerHapticFeedback({ type: "impact", impact_style: "heavy" })
                                }
                            }
                            if (item.isMagnet) {
                                isHeroEating.current = true
                                setMagnetTimeLeft(GameConfig.magnetDuration)
                                triggerHapticFeedback({ type: "impact", impact_style: "medium" })
                            }
                        } else {
                            updated.push(item)
                        }
                    } else {
                        updated.push(item)
                    }
                }
                return updated
            })
        }
        const interval = setInterval(moveItems, 10)
        return () => clearInterval(interval)
    }, [gameState])

    
    useEffect(() => {
        if (gameState !== GameState.Play) return 
        function addItem () {
            const seed = Math.floor(Math.random() * 99)
            const x = Math.floor(Math.random() * (width.current - 28))
            const item = tokensPool[seed](x)
            setItems(prev => {
                return [...prev, item]
            })
        }
        const interval = setInterval(addItem, (3 - speedModifier.current) * 200)
        return () => clearInterval(interval)
    }, [gameState, speedModifier.current])

    useEffect(() => {
        if (gameState !== GameState.Play && gameState !== GameState.TimeExpired) return 
        function onMove (e: TouchEvent) {
            const lastTouch = e.touches.item(e.touches.length - 1)
            if (!lastTouch) return
            let x = lastTouch.clientX
            if (x < 46) x = 46
            if (x > width.current - 16) x = width.current - 16
            heroX.current = x - 46
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
    }, [gameState, sliderRef.current])


    return (
        <>
            <button className={styles.slider} style={{ left: `${heroX.current}px`, bottom: `${heroYBottomPadding.current}px` }} ref={sliderRef}>
                <GameSlider/>
            </button>
            <canvas className={styles.canvas} width={width.current} height={height.current} ref={ref}/>
        </>
    )
}