import { FC } from "react";
import styles from "./styles.module.css";
import { TelegramEmojiProps, TelegramEmojiType } from "./TelegramEmoji.t";
import { MultiMapping, classBuilder } from "@utils";
import Lottie from "react-lottie";
import chickData from "./hatching_chick.json"
import finishData from "./finish.json"
import rocketData from "./rocket.json"
import gamepadData from "./game.json"
import moneyBagData from "./moneybag.json"
import timeData from "./time.json"
import ticketData from "./ticket.json"
import bombData from "./bomb.json"
import lightningData from "./lightning.json"

const SourceMapping = new MultiMapping<TelegramEmojiType, [[any, undefined]]>(
    [
        {
            [TelegramEmojiType.HatchingChick]: chickData,
            [TelegramEmojiType.Gamepad]: gamepadData,
            [TelegramEmojiType.FinishFlag]: finishData,
            [TelegramEmojiType.Rocket]: rocketData,
            [TelegramEmojiType.MoneyBag]: moneyBagData,
            [TelegramEmojiType.Time]: timeData,
            [TelegramEmojiType.Ticket]: ticketData,
            [TelegramEmojiType.Bomb]: bombData,
            [TelegramEmojiType.Lightning]: lightningData,
        },
        undefined
    ]
);

export const TelegramEmoji: FC<TelegramEmojiProps> = ({
    type, size
}) => {

    const className = classBuilder(
        styles,
        [size],
        styles.emoji_wrapper
    )
    const [animationData] = SourceMapping.match(type)

    return (
        <div className={className}>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData
                }}
                isClickToPauseDisabled
            />
            {/* <img src={imgSrc}/> */}
        </div>
    )
}