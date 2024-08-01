import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { TelegramEmojiProps, TelegramEmojiType } from "./TelegramEmoji.t";
import { MultiMapping, classBuilder } from "@utils";
import { DotLottie, DotLottieReact } from '@lottiefiles/dotlottie-react';

const SourceMapping = new MultiMapping<TelegramEmojiType, [[string, undefined]]>(
    [
        {
            [TelegramEmojiType.HatchingChick]: "/tg-emojis/hatching_chick",
            [TelegramEmojiType.Gamepad]: "/tg-emojis/gamepad",
            [TelegramEmojiType.FinishFlag]: "/tg-emojis/finish_flag",
            [TelegramEmojiType.Rocket]: "/tg-emojis/rocket",
            [TelegramEmojiType.MoneyBag]: "/tg-emojis/money_bag",
            [TelegramEmojiType.Time]: "/tg-emojis/time",
            [TelegramEmojiType.Bomb]: "/tg-emojis/bomb",
            [TelegramEmojiType.Lightning]: "/tg-emojis/lightning",
            [TelegramEmojiType.Books]: "/tg-emojis/books",
            [TelegramEmojiType.RollerCoaster]: "/tg-emojis/rollercoaster",
            [TelegramEmojiType.ChampangeGlasses]: "/tg-emojis/champange_glasses",
            [TelegramEmojiType.Megaphone]: "/tg-emojis/megaphone",
            [TelegramEmojiType.Handwave]: "/tg-emojis/handwave"
        },
        undefined
    ]
);

export const TelegramEmoji: FC<TelegramEmojiProps> = ({
    type, size
}) => {

    const [isLoaded, setIsLoaded] = useState(false)

    const className = classBuilder(
        styles,
        [size],
        styles.tg_emoji
    )
    const [src] = SourceMapping.match(type)

    const [lottie, setLottie] = useState<DotLottie | null>(null);
    const lottieRefCallback = (lottie: DotLottie) => {
        setLottie(lottie);
    }
    useEffect(() => {
        if (!lottie) return
        function onPlay () {
            setIsLoaded(true)
        }
        lottie.addEventListener("play", onPlay)
        return () => lottie.removeEventListener("play", onPlay)
    }, [lottie])
    
    return (
        <div className={className}>
            {
                isLoaded
                ?
                null
                :
                <img className={styles.placeholder} src={src + '.svg'}/>
            }
            <DotLottieReact
                src={src + '.lottie'}
                loop
                autoplay
                dotLottieRefCallback={lottieRefCallback}
            />
        </div>
    )
}