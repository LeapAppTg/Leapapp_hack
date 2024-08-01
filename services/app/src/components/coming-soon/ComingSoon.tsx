import { HeroGood, Wrench } from "@assets";
import { TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { useCountdown } from "@hooks";
import { FlexGapRow8, TextMSemiBold, TextXSRegularGrey400, currentTimestamp } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";
import { useAuth } from "@providers";

type Props = {
    inTime: number
}

export const ComingSoon: FC<Props> = ({ inTime }) => {

    const { timeLeft } = useCountdown(inTime)

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
            <div className={FlexGapRow8.className}>
                <TelegramEmoji size={TelegramEmojiSize.MediumSmall} type={TelegramEmojiType.Time}/>
                <p className={TextMSemiBold.className}>
                    {timeLeft.toDisplayString(4)}
                </p>
            </div>
        </div>
    )
}