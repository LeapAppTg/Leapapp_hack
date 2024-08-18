export enum GameState {
    Countdown,
    Play,
    Bomb,
    TimeExpired,
    BombEnd,
    TimeEnd
}

export const GameConfig = {
    gameDuration: 61,
    magnetDuration: 10,
    speedIncreaseTime: 30
}

type ItemProps = {
    src: string,
    x: number,
    reward: number
}

type ItemOpts = {
    isBomb?: boolean,
    isMagnet?: boolean
}

export class Item {
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

    public moveY (y?: number) {
        this.y += y ? y : 2
        return this
    }
    public moveX (x: number) {
        this.x += x
        return this
    }
}

const tokens: {
    chance: number,
    token: (x: number) => Item
}[] = [
    {
        chance: 50,
        token: (x: number) => new Item({
            src: 'game-items/gold.svg',
            x,
            reward: 2
        })
    },
    {
        chance: 11,
        token: (x: number) => new Item({
            src: 'game-items/ufo.svg',
            x,
            reward: 10
        })
    },
    {
        chance: 11,
        token: (x: number) => new Item({
            src: 'game-items/durov.svg',
            x,
            reward: 10
        })
    },
    {
        chance: 15,
        token: (x: number) => new Item({
            src: 'game-items/rocket.svg',
            x,
            reward: -5
        })
    },
    {
        chance: 3,
        token: (x: number) => new Item({
            src: 'game-items/dollar.svg',
            x,
            reward: 35
        })
    },
    {
        chance: 3,
        token: (x: number) => new Item({
            src: 'game-items/magnet.svg',
            x,
            reward: 0
        }, {
            isMagnet: true
        })
    },
    {
        chance: 7,
        token: (x: number) => new Item({
            src: 'game-items/bomb.svg',
            x,
            reward: 0
        }, {
            isBomb: true
        })
    }
]

function getTokensPool () {
    let cursor = 0
    const pool:((x: number) => Item)[]  = new Array(100)
    for (let token of tokens) {
        pool.fill(token.token, cursor, cursor + token.chance)
        cursor += token.chance
    }
    return pool
}

export const tokensPool = getTokensPool()