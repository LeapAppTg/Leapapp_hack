import { classJoiner } from "@utils";
import { FC, useMemo } from "react";
import { Canvas, GameBar, Loader } from "./components";
import { EndScreen } from "./elements";
import { GameProvider, GameState, useGame } from "./providers";
import styles from "./styles.module.css";

export const GamePage: FC = () => {

    return (
        <GameProvider>
            <GameContent/>
        </GameProvider>
    )
}

const GameContent: FC = () => {
    const { magnetTimeLeft, gameState, isNewHighScore } = useGame()

    const extraClass = useMemo(() => {
        if (gameState === GameState.TimeEnd) return styles.gold_highlight
        if (gameState === GameState.Bomb) return styles.red_highlight
        if (isNewHighScore) return styles.gold_highlight
        if (magnetTimeLeft) return styles.pink_highlight
        return undefined
    }, [gameState, isNewHighScore, magnetTimeLeft])

    if (gameState === GameState.TimeEnd || gameState === GameState.BombEnd) return <EndScreen/>

    return (
        <div className={classJoiner(styles.game, extraClass)}>
            <GameBar/>
            {
                gameState === GameState.Countdown
                ?
                <Loader/>
                :
                <Canvas/>
            }
        </div>
    )
}