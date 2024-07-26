import { MagnetCoin } from "@assets";
import { TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { FlexGapColumn4, FlexGapColumnFullWidthAlignFlexEnd, FlexGapColumnFullWidthAlignFlexStart, FlexGapRow4, TextColor, TextXLSemiBold, TextXSBold, TextXSMedium, TextXXSRegularGrey400, TimeObject, classJoiner } from "@utils";
import { FC, useEffect, useMemo, useState } from "react";
import { useGame } from "../../providers";
import styles from "./styles.module.css";

export const GameBar: FC = () => {

    const { score, pendingScores, timeLeft, magnetTimeLeft, highScore, isNewHighScore } = useGame()

    const timeLeftDisplay = useMemo(() => {
        const obj = TimeObject.fromTimestamp(timeLeft * 1000)
        const arr = obj.toTimerDisplayArray(2, true)
        const secs = arr[arr.length - 1].value
        const mins = obj.minutes.format()
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
                    magnetTimeLeft
                    ?
                    <div className={FlexGapRow4.className}>
                        <MagnetCoin width={16} height={16}/>
                        <p className={TextXSMedium.update({ color: TextColor.Purple400 }).className}>
                            0:{magnetTimeLeft < 10 ? '0' : null}{magnetTimeLeft.format()}
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
                pendingScores.map(p => <NewScore {...p} key={p.id}/>)
            }
        </div>
    )
}

export type NewScoreProps = {
    id: number,
    score: number
}

const NewScore: FC<NewScoreProps> = ({ id, score }) => {
    const { removePendingScore, setScore } = useGame()
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
        return () => clearTimeout(1000)
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