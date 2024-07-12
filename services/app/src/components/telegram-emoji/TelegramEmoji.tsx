import { FC } from "react";
import styles from "./styles.module.css";
import { TelegramEmojiProps, TelegramEmojiType } from "./TelegramEmoji.t";
import { MultiMapping, classBuilder } from "@utils";

const SourceMapping = new MultiMapping<TelegramEmojiType, [[string, undefined]]>(
    [
        {
            [TelegramEmojiType.HatchingChick]: 'tg-emojis/hatching_chick.png',
            [TelegramEmojiType.Gamepad]: 'tg-emojis/gamepad.png',
            [TelegramEmojiType.FinishFlag]: 'tg-emojis/finish_flag.png',
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
    const [imgSrc] = SourceMapping.match(type)

    return (
        <div className={className}>
            <img src={imgSrc}/>
        </div>
    )
}