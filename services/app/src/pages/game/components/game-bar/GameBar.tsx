import { MagnetCoin } from "@assets";
import { TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { useUnixCountdown } from "@hooks";
import { FlexGapColumn4, FlexGapColumnFullWidthAlignFlexEnd, FlexGapColumnFullWidthAlignFlexStart, FlexGapRow4, TextColor, TextXLSemiBold, TextXSBold, TextXSMedium, TextXXSRegularGrey400, classJoiner } from "@utils";
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

type Props = {
    score: number,
    gameEndAt: number,
    magnetEndAt: number,
    pendingScores: NewScoreProps[],
    isNewHighScore: boolean,
    highScore: number,
    setScore: Dispatch<SetStateAction<number>>,
    removePendingScore: (score: number) => any
}

export const GameBar: FC<Props>= ({
    gameEndAt, highScore, isNewHighScore, magnetEndAt, pendingScores, score, setScore, removePendingScore
}) => {
    const { timeLeft } = useUnixCountdown(gameEndAt)
    const { timeLeft: magnetTimeLeft } = useUnixCountdown(magnetEndAt)

    const timeLeftDisplay = useMemo(() => {
        const arr = timeLeft.toTimerDisplayArray(2, true)
        const secs = arr[arr.length - 1].value
        const mins = timeLeft.minutes.format()
        return `${mins}:${secs}`
    }, [timeLeft])

    return (
        <div className={styles.bar}>
            <div className={FlexGapColumnFullWidthAlignFlexStart.className}>
                <p className={TextXXSRegularGrey400.className}>
                    Game
                </p>
                <p className={classJoiner(TextXSBold.className, isNewHighScore ? styles.record : undefined)}>
                    {score.format()}
                </p>
            </div>
            <div className={FlexGapColumn4.className}>
                <div className={FlexGapRow4.className}>
                    <TelegramEmoji type={TelegramEmojiType.Time} size={TelegramEmojiSize.Small}/>
                    <p className={TextXSMedium.update({ color: TextColor.Purple400 }).className}>
                        {timeLeftDisplay}
                    </p>
                </div>
                {
                    !magnetTimeLeft.isZeroed()
                    ?
                    <div className={FlexGapRow4.className}>
                        <MagnetCoin width={16} height={16}/>
                        <p className={TextXSMedium.update({ color: TextColor.Purple400 }).className}>
                            0:{magnetTimeLeft.seconds < 10 ? '0' : null}{magnetTimeLeft.seconds.format()}
                        </p>
                    </div>
                    :
                    null
                }
            </div>
            <div className={FlexGapColumnFullWidthAlignFlexEnd.className}>
                <p className={TextXXSRegularGrey400.className}>
                    Record
                </p>
                <p className={classJoiner(TextXSBold.className, styles.record)}>
                    {highScore.format()}
                </p>
            </div>
            {
                pendingScores.map(p => <NewScore {...p} setScore={setScore} removePendingScore={removePendingScore} key={p.id}/>)
            }
        </div>
    )
}

export type NewScoreProps = {
    id: number,
    score: number
}

const NewScore: FC<NewScoreProps & { setScore: Dispatch<SetStateAction<number>>, removePendingScore: (score: number) => any}> = (
    { id, score, removePendingScore, setScore }
) => {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        let int: NodeJS.Timeout
        int = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(int)
                    return prev
                }
                return prev + 1
            })
        }, 10)
        return () => clearInterval(int)
    }, [])

    const [left, bottom] = useMemo(() => {
        const x = 1 - progress / 100
        const y = 1 - Math.pow(x, 3)

        const left = `${x * 60 - 60}%`
        const bottom = `${y * 130 - 90}%`

        return [left, bottom]
    }, [progress])

    useEffect(() => {
        const to = setTimeout(() => {
            setScore(prev => prev + score > 0 ? prev + score : 0)
            removePendingScore(id)
        }, 1000)
        return () => clearTimeout(to)
    }, [])

    return (
        <div className={classJoiner(styles.new_score, score < 0 ? styles.negative : undefined)} style={{ left, bottom }}>
            <p className={TextXLSemiBold.className}>
                {
                    score > 0
                    ?
                    `+${score.format()}`
                    :
                    score.format()
                }
            </p>
        </div>
    )
}