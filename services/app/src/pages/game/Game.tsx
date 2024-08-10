import { ApiRoutes, useData } from "@hooks";
import { useTelegram } from "@providers";
import { classJoiner, currentUnixTimestamp } from "@utils";
import { FC, useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Canvas, GameBar, Loader, NewScoreProps } from "./components";
import { GameConfig, GameState } from "./config";
import { EndScreen } from "./elements";
import styles from "./styles.module.css";

export const GamePage: FC = () => {
    const [gameState, setGameState] = useState<GameState>(GameState.Countdown)
    const [score, setScore] = useState<number>(0)
    const [gameEndAt, setGameEndAt] = useState<number>(currentUnixTimestamp() + GameConfig.gameDuration)
    const [magnetEndAt, setMagnetEndAt] = useState<number>(currentUnixTimestamp())
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)
    const { triggerHapticFeedback } = useTelegram()

    const highScore = userProfile?.gameRecord || 0;
    const isNewHighScore = score > highScore;

    useEffect(() => {
        if (isNewHighScore) triggerHapticFeedback({ type: "impact", impact_style: "medium" })
    }, [isNewHighScore])

    const [pendingScores, managePendingScores] = useReducer((
        pendingScores: NewScoreProps[], managePendingScores: { add?: NewScoreProps, remove?: number }
    ) => {
        if (managePendingScores.add) return [...pendingScores, managePendingScores.add]
        else return pendingScores.filter(s => s.id !== managePendingScores.remove)
    }, [])

    const removePendingScore = useCallback((id: number) => {
        managePendingScores({ remove: id })
    }, []);    
    
    const addPendingScore = useCallback((score: number) => {
        managePendingScores({ add: { id: Date.now(), score } })
    }, []);    

    useEffect(() => {
        if (gameState === GameState.Countdown || gameState === GameState.Play) return
        if (gameState === GameState.Bomb || gameState === GameState.TimeEnd || gameState === GameState.BombEnd || gameState === GameState.TimeExpired) {
            setMagnetEndAt(currentUnixTimestamp())
            setGameEndAt(currentUnixTimestamp())
        }
        if (gameState === GameState.Bomb) {
            const timeout = setTimeout(() => setGameState(GameState.BombEnd), 1000)
            return () => clearTimeout(timeout)
        }
        if (gameState === GameState.TimeExpired) {
            const timeout = setTimeout(() => setGameState(GameState.TimeEnd), 3000)
            return () => clearTimeout(timeout)
        }
    }, [gameState])

    useEffect(() => {
        if (gameState === GameState.Play) {
            const remainingTime = gameEndAt - currentUnixTimestamp()
            if (remainingTime > 0) {
                const timeout = setTimeout(() => setGameState(GameState.TimeExpired), remainingTime * 1000)
                return () => clearTimeout(timeout)
            } else {
                setGameState(GameState.TimeExpired)
            }
        }
    }, [gameState, gameEndAt])

    const reset = useCallback(() => {
        setGameState(GameState.Countdown)
        setScore(0)
        setGameEndAt(currentUnixTimestamp() + GameConfig.gameDuration)
        setMagnetEndAt(currentUnixTimestamp())
    }, []);

    const extraClass = useMemo(() => {
        if (gameState === GameState.TimeEnd) return styles.gold_highlight
        if (gameState === GameState.Bomb) return styles.red_highlight
        if (isNewHighScore) return styles.gold_highlight
        if (magnetEndAt > currentUnixTimestamp()) return styles.pink_highlight
        return undefined
    }, [gameState, isNewHighScore, magnetEndAt])

    if (gameState === GameState.TimeEnd || gameState === GameState.BombEnd) return <EndScreen gameState={gameState} reset={reset} score={score}/>

    return (
        <div className={classJoiner(styles.game, extraClass)}>
            <GameBar
                gameEndAt={gameEndAt} highScore={highScore} isNewHighScore={isNewHighScore} magnetEndAt={magnetEndAt}
                pendingScores={pendingScores} removePendingScore={removePendingScore} score={score} setScore={setScore}
            />
            {
                gameState === GameState.Countdown
                ?
                <Loader setGameState={setGameState}/>
                :
                <Canvas 
                    addPendingScore={addPendingScore} gameEndAt={gameEndAt} gameState={gameState} magnetEndAt={magnetEndAt}
                    setGameState={setGameState} setMagnetEndAt={setMagnetEndAt}
                />
            }
        </div>
    )
}