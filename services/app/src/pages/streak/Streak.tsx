import { Coin, TicketEmoji } from "@assets";
import { ApiError } from "@builders";
import { AlertStatus, AnimatedSquares, Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useAlerts, useAuth, useTelegram } from "@providers";
import { postDailyReward } from "@services";
import { FlexGapColumn, FlexGapColumn8, FlexGapColumn8FullWidth, FlexGapRow12FullWidth, FlexGapRow8, TextColor, TextSRegular, TextXLMedium, TextXSRegular, TextXXLMedium, TextXXXLBold, classJoiner } from "@utils";
import { FC, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "./styles.module.css";

export const StreakPage: FC = () => {
    
    const { data, mutate } = useData(ApiRoutes.GetDailyReward)
    const { data: userProfile, mutate: mutateUser } = useData(ApiRoutes.GetUserProfile)
    const { sendAlert } = useAlerts()
    const { authToken } = useAuth()
    const { triggerHapticFeedback } = useTelegram()

    async function onClaim () {
        if (!data || !data.canClaim || !authToken) return

        try {
            await postDailyReward(authToken)
            let message = 'You got'
            if (data.points) message += ` +${data.points.toString()} points`
            if (data.gameTickets) message += ` +${data.gameTickets.toString()} tickets`
            sendAlert({
                message,
                status: AlertStatus.Success,
            })
            mutate({ ...data, canClaim: false })
            mutateUser(userProfile ? { ...userProfile, points: userProfile.points + data.points, gameTickets: userProfile.gameTickets + data.gameTickets } : undefined)
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

    const [day, setDay] = useState<number>(0)
    const [dayProgress, setDayProgress] = useState<number>(0)
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    useEffect(() => {
        if (!data?.days) return
        const speed = data.days < 10 ? 200 : 2000 / data.days
        let int: NodeJS.Timeout
        int = setInterval(() => {
            const progressStep = 100 / data.days
            setDayProgress(prev => prev + progressStep)
            setDay(prev => {
                if (prev >= data.days - 1) clearInterval(int)
                return prev + 1
            })
        }, speed)

        return () => clearInterval(int)
    }, [data?.days])

    useEffect(() => {
        const to = setTimeout(() => setButtonDisabled(false), 2_000)
        return () => clearTimeout(to)
    }, [])

    if (!data || !data.canClaim) return <Navigate to={'/home'}/>

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

                    <TelegramEmoji size={TelegramEmojiSize.XXLarge} type={TelegramEmojiType.Rocket}/>

                    <div className={FlexGapColumn8.className}>
                        <div className={FlexGapColumn.className}>
                            <h1 className={TextXXXLBold.className} style={{ opacity: `${dayProgress}%` }}>
                                {day.format()}
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
                        <div className={classJoiner(FlexGapColumn8FullWidth.className, styles.reward)}>
                            <p className={TextSRegular.update({ color: TextColor.Grey400 }).className}>
                                Bonus coins
                            </p>
                            <div className={FlexGapRow8.className}>
                                <Coin width={40} height={40}/>
                                <p className={TextXLMedium.className}>{data.points.format()}</p>
                            </div>
                        </div>
                        <div className={classJoiner(FlexGapColumn8FullWidth.className, styles.reward)}>
                            <p className={TextSRegular.update({ color: TextColor.Grey400 }).className}>
                                Game Tickets
                            </p>
                            <div className={FlexGapRow8.className}>
                                <TicketEmoji width={40} height={40}/>
                                <p className={TextXLMedium.className}>{data.gameTickets.format()}</p>
                            </div>
                        </div>
                    </div>

                    <AnimatedSquares/>

                </div>
            </div>

            <Button style={ButtonStyle.Primary} fillFullWidth onClick={onClaim} disabled={buttonDisabled}>
                Take and continue
            </Button>
        </div>
    )
}