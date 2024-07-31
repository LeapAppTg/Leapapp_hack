import { FC } from "react";
import styles from "./styles.module.css";
import { TelegramEmojiProps, TelegramEmojiType } from "./TelegramEmoji.t";
import { MultiMapping, classBuilder } from "@utils";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const SourceMapping = new MultiMapping<TelegramEmojiType, [[string, undefined]]>(
    [
        {
            [TelegramEmojiType.HatchingChick]: "/tg-emojis/hatching_chick.lottie",
            [TelegramEmojiType.Gamepad]: "/tg-emojis/gamepad.lottie",
            [TelegramEmojiType.FinishFlag]: "/tg-emojis/finish_flag.lottie",
            [TelegramEmojiType.Rocket]: "/tg-emojis/rocket.lottie",
            [TelegramEmojiType.MoneyBag]: "/tg-emojis/money_bag.lottie",
            [TelegramEmojiType.Time]: "/tg-emojis/time.lottie",
            [TelegramEmojiType.Bomb]: "/tg-emojis/bomb.lottie",
            [TelegramEmojiType.Lightning]: "/tg-emojis/lightning.lottie",
            [TelegramEmojiType.Books]: "/tg-emojis/books.lottie",
            [TelegramEmojiType.RollerCoaster]: "/tg-emojis/rollercoaster.lottie",
            [TelegramEmojiType.ChampangeGlasses]: "/tg-emojis/champange_glasses.lottie",
            [TelegramEmojiType.Megaphone]: "/tg-emojis/megaphone.lottie"
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
    const [src] = SourceMapping.match(type)

    return (
        <div className={className}>
            <DotLottieReact
                src={src}
                loop
                autoplay
            />
        </div>
    )
}