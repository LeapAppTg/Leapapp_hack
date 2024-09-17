import { HeroGood, Wrench } from "@assets";
import { TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { useCountdown } from "@hooks";
import { FlexGapRow8, TextMSemiBold, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

type Props = {
    inTime?: number
}

export const ComingSoon: FC<Props> = ({ inTime }) => {
    return (
        <div className={styles.coming_soon}>
            <div className={styles.hero}>
                <HeroGood width={60} height={60}/>
                <Wrench width={38} height={41} className={styles.wrench}/>
            </div>
            <p className={TextMSemiBold.className}>
                Coming soon
            </p>
            <p className={TextXSRegularGrey400.className}>
                We are on it
            </p>
            {
                inTime
                ?
                <Timer inTime={inTime}/>
                :
                null
            }
        </div>
    )
}

const Timer: FC<{ inTime: number }> = ({ inTime }) => {

    const { timeLeft } = useCountdown(inTime || 0)
    
    return (
        <div className={FlexGapRow8.className}>
            <TelegramEmoji size={TelegramEmojiSize.MediumSmall} type={TelegramEmojiType.Time}/>
            <p className={TextMSemiBold.className}>
                {timeLeft.toDisplayString(4)}
            </p>
        </div>
    )
}