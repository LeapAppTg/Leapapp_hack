import { ElementRef, FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { BombCoin, GoldCoin, HeroGood, HeroOpen, HeroSad2, MagnetCoin } from "@assets";
import { GameSlider } from "@components";
import { GameState, useGame } from "../../providers";
import { IconBox, IconSize } from "@icons";

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
class Eye extends Item {
    constructor(x: number) {
        super({
            src: 'game-items/eye.svg',
            x,
            reward: 15
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
            reward: -5
        })
    }
}
class Ufo extends Item {
    constructor(x: number) {
        super({
            src: 'game-items/ufo.svg',
            x,
            reward: 30
        })
    }
}

export const Canvas: FC = () => {

    const ref = useRef<ElementRef<"canvas">>(null)
    const sliderRef = useRef<ElementRef<"button">>(null)

    const [width, setWidth] = useState(document.body.clientWidth - 32)
    const [height, setHeight] = useState(document.body.clientHeight - 32)
    const [items, setItems] = useState<Item[]>([])
    const heroX = useRef(54)
    const isHeroActive = useRef(false)
    const magnetTimeLeftRef = useRef(0)
    const { gameState, setGameState, addPendingScore, setMagnetTimeLeft, magnetTimeLeft } = useGame()

    useEffect(() => {
        magnetTimeLeftRef.current = magnetTimeLeft
    }, [magnetTimeLeft])

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
        if (gameState !== GameState.Play && gameState !== GameState.TimeExpired) return 
        function moveItems () {
            setItems(prev => {
                let moved = prev.map(i => i.moveY())
                if (magnetTimeLeftRef.current) moved = moved.map(i => i.y >= height - 260 && Math.abs(heroX.current - i.x) <= 100 ? i.moveX(heroX.current + 16 - i.x > 0 ? 1 : -1) : i)
                const filtered = moved.filter(i => i.y <= height)
                const updated: Item[] = []
                for (let item of filtered) {
                    if (item.y > height - 160 && item.y < height - 100 && item.x > heroX.current - 24 && item.x < heroX.current + 24) {
                        if (item.isBomb) setGameState(GameState.Bomb)
                        else if (isHeroActive.current) {
                            if (item.reward) addPendingScore(item.reward)
                            if (item.isMagnet) setMagnetTimeLeft(20)
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
            if (seed <= 450) item = new Gold(x)
            else if (seed <= 600) item = new Eye(x)
            else if (seed <= 750) item = new Rocket(x)
            else if (seed <= 850) item = new Ufo(x)
            else if (seed <= 900) item = new Dollar(x)
            else if (seed <= 950) item = new Bomb(x)
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
            <button className={styles.slider} style={{ left: `${heroX.current}px` }} ref={sliderRef}>
                {
                    magnetTimeLeft
                    ?
                    <>
                    <HeroGood className={styles.hero}/>
                    <MagnetCoin className={styles.magnet}/>
                    </>
                    :
                    gameState === GameState.Bomb
                    ?
                    <>
                    <HeroSad2 className={styles.hero}/>
                    <BombCoin className={styles.magnet}/>
                    </>
                    :
                    <HeroOpen className={styles.hero}/>
                }
                <GameSlider/>
            </button>
            <canvas className={styles.canvas} width={width} height={height} ref={ref}/>
        </>
    )
}