import { Coin, TicketEmoji } from "@assets";
import { ApiError } from "@builders";
import { AlertStatus, Button, ButtonStyle, StickyPanel, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData, useUnixTimestamp } from "@hooks";
import { useAlerts, useAuth } from "@providers";
import { postHourlyReward } from "@services";
import { FlexGapColumn16FullWidth, FlexGapRow4, FlexGapRowFullWidthJustifySpaceBetween, TextAlign, TextColor, TextMSemiBold, TextXSRegular, TextXSRegularGrey400, TimeObject } from "@utils";
import { FC, useMemo } from "react";
import styles from "./styles.module.css";

const rewardPeriod = 60 * 60 * 2

export const HourlyReward: FC = () => {
    
    const { authToken } = useAuth()
    const { sendAlert } = useAlerts()
    const { data, mutate } = useData(ApiRoutes.GetHourlyReward)
    const { data: userProfile, mutate: mutateUserProfile } = useData(ApiRoutes.GetUserProfile)
    const timestamp = useUnixTimestamp()
    
    const [ticketsCount, totalPoints, pointsCount, canClaim, timeLeft, progress] = useMemo(() => {
        if (!data) return ['0', '0', '0', false, '', 50]
        const totalPoints = data.points + data.income
        if (data.canClaim) return [data.gameTickets.format(), totalPoints.format(), totalPoints.format(), true, '', 100]
        const timeLeft = data.nextClaimTime - timestamp
        const progress = 1 - timeLeft / rewardPeriod
        return [(progress * data.gameTickets).format(), totalPoints.format(), (progress * totalPoints).format(), false, TimeObject.fromTimestamp(timeLeft * 1000).toDisplayString(2), Math.floor(progress * 100)]
    }, [data, timestamp])

    async function onClaim () {
        if (!data || !data.canClaim || !authToken) return

        try {
            await postHourlyReward(authToken)
            sendAlert({
                message: `Claimed +${totalPoints} points +${ticketsCount} tickets`,
                status: AlertStatus.Success,
                withConfetti: true
            })
            mutateUserProfile(userProfile ? {...userProfile, points: userProfile.points + data.points + data.income, gameTickets: userProfile.gameTickets + data.gameTickets} : undefined)
            mutate(data ? {...data, nextClaimTime: timestamp + rewardPeriod, canClaim: false } : undefined)
        } catch (e) {
            sendAlert({
                message: ApiError.isApiError(e) ? e.detail || 'Something went wrong' : 'Something went wrong',
                status: AlertStatus.Error,
            })
        }
    }

    return (
        <StickyPanel>
            <div className={FlexGapColumn16FullWidth.className}>
                <div className={FlexGapRowFullWidthJustifySpaceBetween.className}>
                    <div className={FlexGapRow4.className}>
                        <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.MoneyBag}/>
                        <p className={TextMSemiBold.className}>Farming</p>
                    </div>
                    <div className={FlexGapRow4.className}>
                        <Coin width={24} height={24}/>
                        <p className={TextXSRegularGrey400.className}>+{totalPoints}/hour</p>
                    </div>
                </div>
                {
                    canClaim
                    ?
                    <Button style={ButtonStyle.Primary} fillFullWidth onClick={onClaim}>
                        Claim
                        <span className={FlexGapRow4.className}>
                            <Coin height={24} width={24}/>
                            {pointsCount}
                        </span>
                        <span className={FlexGapRow4.className}>
                            <TicketEmoji width={24} height={24}/>
                            {ticketsCount}
                        </span>
                    </Button>
                    :
                    <div className={styles.progress_wrapper}>
                        <p className={TextXSRegular.update({ color: TextColor.Purple925 }).className}>
                            Farming...
                        </p>
                        <div className={FlexGapRow4.className}>
                            <Coin height={24} width={24}/>
                            <p className={TextXSRegular.update({ color: TextColor.Purple925 }).className}>
                                {pointsCount}
                            </p>
                        </div>
                        <div className={FlexGapRow4.className}>
                            <TicketEmoji width={24} height={24}/>
                            <p className={TextXSRegular.update({ color: TextColor.Purple925 }).className}>
                                {ticketsCount}
                            </p>
                        </div>
                        <div className={FlexGapRow4.className}>
                            <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Time}/>
                            <p className={TextXSRegular.update({ color: TextColor.Purple925, textAlign: TextAlign.Left }).withExtraClasses(styles.time_left)}>
                                {timeLeft}
                            </p>
                        </div>
                        <div className={styles.progress} style={{ width: `${progress < 5 ? 95 : progress > 95 ? 5 : 100 - progress}%` }}/>
                    </div>
                }
            </div>
        </StickyPanel>
    )
}