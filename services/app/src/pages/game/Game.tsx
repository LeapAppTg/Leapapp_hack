import { FC } from "react";
import styles from "./styles.module.css"
import { DotsBackground } from "@assets";
import { Canvas, GameBar, Loader } from "./components";
import { GameProvider, GameState, useGame } from "./providers";
import { classJoiner } from "@utils";
import { EndScreen } from "./elements";

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
            <div className={styles.background}>
                <DotsBackground className={styles.dots}/>
                <DotsBackground className={styles.dots}/>
            </div>
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