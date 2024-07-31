import { classJoiner } from "@utils";
import { FC } from "react";
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

    if (gameState === GameState.TimeEnd || gameState === GameState.BombEnd) return <EndScreen/>

    return (
        <div className={classJoiner(styles.game, magnetTimeLeft ? styles.pink_highlight : (gameState === GameState.Bomb || gameState === GameState.TimeExpired) ? styles.red_highlight : isNewHighScore ? styles.gold_highlight : undefined)}>
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