import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { NewScoreProps } from "../components";
import { ApiRoutes, useData } from "@hooks";
import { GameConfig } from "../config";
import { useTelegram } from "@providers";

export enum GameState {
    Countdown,
    Play,
    Bomb,
    TimeExpired,
    BombEnd,
    TimeEnd
}

type GameProps = {
    score: number,
    setScore: Dispatch<SetStateAction<number>>,
    magnetTimeLeft: number,
    setMagnetTimeLeft: Dispatch<SetStateAction<number>>,
    timeLeft: number,
    setTimeLeft: Dispatch<SetStateAction<number>>,
    gameState: GameState,
    setGameState: Dispatch<SetStateAction<GameState>>,
    removePendingScore: (score: number) => any,
    addPendingScore: (score: number) => any,
    pendingScores: NewScoreProps[],
    isNewHighScore: boolean,
    highScore: number,
    reset: () => any
}

const GameContext = createContext<GameProps>({
    score: 0,
    setScore: () => null,
    magnetTimeLeft: 0,
    setMagnetTimeLeft: () => null,
    timeLeft: 0,
    setTimeLeft: () => null,
    removePendingScore: () => null,
    addPendingScore: () => null,
    pendingScores: [],
    gameState: GameState.Countdown,
    setGameState: () => null,
    isNewHighScore: false,
    highScore: 0,
    reset: () => null
})

export const useGame = () => useContext(GameContext)

export const GameProvider: FC<PropsWithChildren> = ({
    children
}) => {
    const [gameState, setGameState] = useState<GameState>(GameState.Countdown)
    const [score, setScore] = useState<number>(0)
    const [timeLeft, setTimeLeft] = useState<number>(GameConfig.gameDuration)
    const [magnetTimeLeft, setMagnetTimeLeft] = useState<number>(0)
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)
    const { triggerHapticFeedback } = useTelegram()

    const [isNewHighScore, highScore] = useMemo(() => {
        if (!userProfile) return [false, 0]
        if (userProfile.gameRecord >= score) return [false, userProfile.gameRecord]
        return [true, score]
    }, [userProfile, score])

    useEffect(() => {
        if (isNewHighScore) triggerHapticFeedback({ type: "impact", impact_style: "medium" })
    }, [isNewHighScore])

    const [pendingScores, managePendingScores] = useReducer((
        pendingScores: NewScoreProps[], managePendingScores: { add?: NewScoreProps, remove?: number }
    ) => {
        if (managePendingScores.add) return [...pendingScores, managePendingScores.add]
        else return pendingScores.filter(s => s.id !== managePendingScores.remove)
    }, [])

    function removePendingScore (id: number) {
        managePendingScores({ remove: id })
    }
    
    function addPendingScore (score: number) {
        managePendingScores({ add: { id: Date.now(), score } })
    }

    useEffect(() => {
        if (gameState === GameState.Countdown) return
        if (gameState === GameState.Play) {
            const interval = setInterval(() => {
                setMagnetTimeLeft(prev => prev === 0 ? prev : prev - 1)
                setTimeLeft(prev => prev === 0 ? prev : prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
        if (gameState === GameState.Bomb || gameState === GameState.TimeEnd || gameState === GameState.BombEnd || gameState === GameState.TimeExpired) {
            setMagnetTimeLeft(0)
            setTimeLeft(0)
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
        if (gameState === GameState.Play && timeLeft === 0) {
            setGameState(GameState.TimeExpired)
        } 
    }, [gameState, timeLeft])

    function reset () {
        setGameState(GameState.Countdown)
        setScore(0)
        setTimeLeft(GameConfig.gameDuration)
        setMagnetTimeLeft(0)
    }

    return (
        <GameContext.Provider
        value={{
            score,
            setScore,
            addPendingScore,
            removePendingScore,
            pendingScores,
            magnetTimeLeft,
            setMagnetTimeLeft,
            gameState,
            setGameState,
            setTimeLeft,
            timeLeft,
            highScore,
            isNewHighScore,
            reset
        }}
        >
            {children}
        </GameContext.Provider>
    )
}