import { Coin, TicketEmoji } from "@assets";
import { AlertStatus, AnimatedSquares, Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAlerts, useTelegram } from "@providers";
import { FlexGapColumn8, FlexGapColumn8FullWidth, FlexGapRow12FullWidth, FlexGapRow8, TextColor, TextSRegular, TextXLMedium, TextXSRegular, TextXXLMedium, classJoiner } from "@utils";
import { FC, useEffect } from "react";
import styles from "./styles.module.css";

export const WelcomeBonus: FC = () => {
    
    const { triggerHapticFeedback } = useTelegram()
    const { sendAlert } = useAlerts()

    useEffect(() => {
        const to = setTimeout(() => {
            triggerHapticFeedback({ type: "impact", impact_style: "heavy" })
        }, 100)
        return () => clearTimeout(to)
    }, [])

    function onClaim () {
        sendAlert({
            message: 'You got +3 000 points +5 tickets',
            status: AlertStatus.Success,
        })
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.confetti_bg}>
                <DotLottieReact
                    src="/animations/streak_confetti.lottie"
                    loop
                    autoplay
                />
            </div>

            <div className={styles.content_wrapper}>
                <div className={styles.content}>

                    <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.background}/>

                    <TelegramEmoji size={TelegramEmojiSize.XXLarge} type={TelegramEmojiType.Handwave}/>

                    <div className={FlexGapColumn8.className}>
                        <h3 className={TextXXLMedium.className}>
                            Welcome!
                        </h3>
                        <p className={TextXSRegular.className}>
                            Hey, take your welcome points and tickets
                        </p>
                    </div>


                    <div className={FlexGapRow12FullWidth.className}>
                        <div className={classJoiner(FlexGapColumn8FullWidth.className, styles.reward)}>
                            <p className={TextSRegular.update({ color: TextColor.Grey400 }).className}>
                                Bonus coins
                            </p>
                            <div className={FlexGapRow8.className}>
                                <Coin width={40} height={40}/>
                                <p className={TextXLMedium.className}>
                                    {Number(3000).format()}
                                </p>
                            </div>
                        </div>
                        <div className={classJoiner(FlexGapColumn8FullWidth.className, styles.reward)}>
                            <p className={TextSRegular.update({ color: TextColor.Grey400 }).className}>
                                Game Tickets
                            </p>
                            <div className={FlexGapRow8.className}>
                                <TicketEmoji width={40} height={40}/>
                                <p className={TextXLMedium.className}>
                                    {Number(5).format()}
                                </p>
                            </div>
                        </div>
                    </div>

                    <AnimatedSquares/>

                </div>
            </div>

            <Button style={ButtonStyle.Primary} fillFullWidth onClick={onClaim} linkTo="/streak">
                Claim and continue
            </Button>
        </div>
    )
}