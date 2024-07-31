import { GameSlider } from "@components";
import { useTelegram } from "@providers";
import { ElementRef, FC, useEffect, useRef, useState } from "react";
import { GameConfig } from "../../config";
import { GameState, useGame } from "../../providers";
import styles from "./styles.module.css";

type ItemProps = {
    src: string,
    x: number,
    reward: number
}

type ItemOpts = {
    isBomb?: boolean,
    isMagnet?: boolean
}

class Item {
    public src: string
    public x: number
    public y: number
    public reward: number
    public isBomb?: boolean
    public isMagnet?: boolean
    
    constructor(props: ItemProps, opts?: ItemOpts) {
        this.src = props.src
        this.x = props.x
        this.y = -28
        this.reward = props.reward
        this.isBomb = opts?.isBomb
        this.isMagnet = opts?.isMagnet
    }

    public createImg () {
        const img = new Image(28, 28)
        img.src = this.src
        return img
    }

    public moveY () {
        this.y += 2
        return this
    }
    public moveX (x: number) {
        this.x += x
        return this
    }
}

class Bomb extends Item {
    constructor(x: number) {
        super({
            src: 'game-items/bomb.svg',
            x,
            reward: 0
        }, {
            isBomb: true
        })
    }
}
class Dollar extends Item {
    constructor(x: number) {
        super({
            src: 'game-items/dollar.svg',
            x,
            reward: 100
        })
    }
}
class Gold extends Item {
    constructor(x: number) {
        super({
            src: 'game-items/gold.svg',
            x,
            reward: 5
        })
    }
}
class Magnet extends Item {
    constructor(x: number) {
        super({
            src: 'game-items/magnet.svg',
            x,
            reward: 0
        }, {
            isMagnet: true
        })
    }
}
class Rocket extends Item {
    constructor(x: number) {
        super({
            src: 'game-items/rocket.svg',
            x,
            reward: -10
        })
    }
}
class Ufo extends Item {
    constructor(x: number) {
        super({
            src: 'game-items/ufo.svg',
            x,
            reward: 25
        })
    }
}

export const Canvas: FC = () => {

    const { triggerHapticFeedback } = useTelegram()

    const ref = useRef<ElementRef<"canvas">>(null)
    const heroRef = useRef<ElementRef<"canvas">>(null)
    const sliderRef = useRef<ElementRef<"button">>(null)

    const [width, setWidth] = useState(document.body.clientWidth - 32)
    const [height, setHeight] = useState(document.body.clientHeight - 32)
    const [items, setItems] = useState<Item[]>([])
    const heroX = useRef(54)
    const isHeroActive = useRef(false)
    const isHeroEating = useRef(false)
    const magnetTimeLeftRef = useRef(0)
    const { gameState, setGameState, addPendingScore, setMagnetTimeLeft, magnetTimeLeft } = useGame()

    useEffect(() => {
        magnetTimeLeftRef.current = magnetTimeLeft
    }, [magnetTimeLeft])

    useEffect(() => {
        const timeout = setTimeout(() => isHeroEating.current = false, 200)
        return () => clearInterval(timeout)
    }, [isHeroEating.current])

    useEffect(() => {
        const listener = () => {
            setWidth(document.body.clientWidth - 32)
            setHeight(document.body.clientHeight - 32)
        }
        window.addEventListener("scroll", listener)
        window.addEventListener("resize", listener)
        return () => {
            window.removeEventListener("scroll", listener)
            window.removeEventListener("resize", listener)
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
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
            for (let item of items) {
                ctx.drawImage(item.createImg(), item.x, item.y)
            }
            
            frame = requestAnimationFrame(animatePoints)
        }
        
        animatePoints()
        
        return () => cancelAnimationFrame(frame)
    }, [gameState, items])

    useEffect(() => {
        if (gameState !== GameState.Play && gameState !== GameState.Bomb && gameState !== GameState.TimeExpired) return 
        const canvas = heroRef.current
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

            ctx.drawImage(hero, heroX.current, 0, 60, 60)
            ctx.drawImage(slider, heroX.current, 60, 60, 40)

            frame = requestAnimationFrame(animatePoints)
        }
        
        animatePoints()
        
        return () => cancelAnimationFrame(frame)
    }, [gameState])
    
    useEffect(() => {
        if (gameState !== GameState.Play && gameState !== GameState.TimeExpired) return 
        function moveItems () {
            setItems(prev => {
                if (prev.length === 0) return prev
                let moved = prev.map(i => i.moveY()).filter(i => i.y <= height)
                if (magnetTimeLeftRef.current) moved = moved.map(i => i.y >= height - 260 && Math.abs(heroX.current - i.x) <= 100 ? i.moveX(heroX.current + 16 - i.x > 0 ? 1 : -1) : i)
                const updated: Item[] = []
                for (let item of moved) {
                    if (item.y + 14 > height - 160 && item.y + 14 < height - 100 && item.x + 14 > heroX.current && item.x + 14 < heroX.current + 60) {
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
            const seed = Math.floor(Math.random() * 999) + 1
            const x = Math.floor(Math.random() * (width - 28))
            let item: Item
            if (seed <= 500) item = new Gold(x)
            else if (seed <= 720) item = new Ufo(x)
            else if (seed <= 870) item = new Rocket(x)
            else if (seed <= 900) item = new Dollar(x)
            else if (seed <= 970) item = new Bomb(x)
            else item = new Magnet(x)
            setItems(prev => {
                return [...prev, item]
            })
        }
        const interval = setInterval(addItem, 500)
        return () => clearInterval(interval)
    }, [gameState])

    useEffect(() => {
        if (gameState !== GameState.Play && gameState !== GameState.TimeExpired) return 
        function onMove (e: TouchEvent) {
            const lastTouch = e.touches.item(e.touches.length - 1)
            if (!lastTouch) return
            let x = lastTouch.clientX
            if (x < 46) x = 46
            if (x > width - 16) x = width - 16
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
            <canvas className={styles.hero_canvas} width={width} height={100} ref={heroRef}/>
            <button className={styles.slider} style={{ left: `${heroX.current}px` }} ref={sliderRef}>
                <GameSlider/>
            </button>
            <canvas className={styles.canvas} width={width} height={height} ref={ref}/>
        </>
    )
}