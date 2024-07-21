import { SquaresPattern } from "@assets";
import { ApiError } from "@builders";
import { AlertStatus, Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { FrogIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { useAlerts, useAuth, useTelegram } from "@providers";
import { postDailyReward } from "@services";
import { FlexGapColumn, FlexGapColumn8, FlexGapColumn8FullWidth, FlexGapRow12FullWidth, FlexGapRow8, TextColor, TextSRegular, TextXLMedium, TextXSRegular, TextXXLMedium, TextXXXLBold } from "@utils";
import { FC, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styles from "./styles.module.css";
import Lottie from "react-lottie";
import animationData from './confetti.json'

export const StreakPage: FC = () => {
    
    const { data, mutate } = useData(ApiRoutes.GetDailyReward)
    const { sendAlert } = useAlerts()
    const { authToken } = useAuth()
    const { triggerHapticFeedback } = useTelegram()

    async function onClaim () {
        if (!data || !data.canClaim || !authToken) return

        try {
            await postDailyReward(authToken)
            sendAlert({
                message: `You got +${data.points.toString()} points`,
                status: AlertStatus.Success,
            })
            mutate({ ...data, canClaim: false })
        } catch (e) {
            sendAlert({
                message: ApiError.isApiError(e) ? e.detail || 'Something went wrong' : 'Something went wrong',
                status: AlertStatus.Error,
            })
        }
    }

    useEffect(() => {
        const to = setTimeout(() => {
            triggerHapticFeedback({ type: "impact", impact_style: "heavy" })
        }, 100)
        return () => clearTimeout(to)
    }, [])

    if (!data || !data.canClaim) return <Navigate to={'/home'}/>

    return (
        <div className={styles.wrapper}>

            <div className={styles.confetti_bg}>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData
                    }}
                    isClickToPauseDisabled
                />
            </div>

            <div className={styles.content_wrapper}>
                <div className={styles.content}>

                    <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.background}/>

                    <TelegramEmoji size={TelegramEmojiSize.XXLarge} type={TelegramEmojiType.Rocket}/>

                    <div className={FlexGapColumn8.className}>
                        <div className={FlexGapColumn.className}>
                            <h1 className={TextXXXLBold.className}>
                                {data.days.format()}
                            </h1>
                            <h3 className={TextXXLMedium.className}>
                                days in a row
                            </h3>
                        </div>
                        <p className={TextXSRegular.className}>
                            Waiting for you tomorrow,<br/>
                            preparing a gift for you.
                        </p>
                    </div>


                    <div className={FlexGapRow12FullWidth.className}>
                        <div className={FlexGapColumn8FullWidth.className}>
                            <p className={TextSRegular.update({ color: TextColor.Grey400 }).className}>
                                Bonus points
                            </p>
                            <div className={FlexGapRow8.className}>
                                <IconBox size={IconSize.Large} icon={PointsIcon}/>
                                <p className={TextXLMedium.className}>{data.points.format()}</p>
                            </div>
                        </div>
                        <div className={FlexGapColumn8FullWidth.className}>
                            <p className={TextSRegular.update({ color: TextColor.Grey400 }).className}>
                                Games
                            </p>
                            <div className={FlexGapRow8.className}>
                                <IconBox size={IconSize.Large} icon={FrogIcon}/>
                                <p className={TextXLMedium.className}>{data.gameTickets.format()}</p>
                            </div>
                        </div>
                    </div>

                    <SquaresPattern className={styles.squares}/>

                </div>
            </div>

            <Button style={ButtonStyle.Primary} fillFullWidth onClick={onClaim}>
                Take and continue
            </Button>
        </div>
    )
}