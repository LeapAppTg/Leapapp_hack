import { ApiError } from "@builders";
import { AlertStatus, Button, ButtonStyle, ContentBlock, StickyPanel, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData, useUnixTimestamp } from "@hooks";
import { FrogIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { useAlerts, useAuth } from "@providers";
import { postHourlyReward } from "@services";
import { FlexGapColumn16FullWidth, FlexGapRow12FullWidth, FlexGapRow4, FlexGapRow4FullWidth, TextColor, TextMSemiBold, TextXSMedium, TextXSRegular, TimeObject, classJoiner } from "@utils";
import { FC, useMemo } from "react";
import styles from "./styles.module.css";
import { HeroThugCoin } from "@assets";

const rewardPeriod = 60 * 60 * 2

export const HourlyReward: FC = () => {
    
    const { authToken } = useAuth()
    const { sendAlert } = useAlerts()
    const { data, mutate } = useData(ApiRoutes.GetHourlyReward)
    const { data: userProfile, mutate: mutateUserProfile } = useData(ApiRoutes.GetUserProfile)
    const timestamp = useUnixTimestamp()
    
    const [ticketsCount, pointsCount, canClaim, timeLeft, progress] = useMemo(() => {
        if (!data) return ['0', '0.00', false, '', 50]
        if (data.canClaim) return [data.gameTickets.format(), data.points.format(undefined, 2), true, '', 100]
        const timeLeft = data.nextClaimTime - timestamp
        const progress = 1 - timeLeft / rewardPeriod
        return [(progress * data.gameTickets).format(), (progress * data.points).format(undefined, 2), false, TimeObject.fromTimestamp(timeLeft * 1000).toDisplayString(2), Math.floor(progress * 100)]
    }, [data, timestamp])

    async function onClaim () {
        if (!data || !data.canClaim || !authToken) return

        try {
            await postHourlyReward(authToken)
            sendAlert({
                message: `Claimed +${data.points.format(undefined, 2)} points +${data.gameTickets.format()} tickets`,
                status: AlertStatus.Success,
                withConfetti: true
            })
            mutateUserProfile(userProfile ? {...userProfile, points: userProfile.points + data.points, gameTickets: userProfile.gameTickets + data.gameTickets} : undefined)
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
                <div className={FlexGapRow4.className}>
                    <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.MoneyBag}/>
                    <p className={TextMSemiBold.className}>Farming</p>
                </div>
                {
                    canClaim
                    ?
                    <Button style={ButtonStyle.Primary} fillFullWidth onClick={onClaim}>
                        Claim
                        <span className={FlexGapRow4.className}>
                            <HeroThugCoin height={24} width={24}/>
                            {pointsCount}
                        </span>
                        <span className={FlexGapRow4.className}>
                            <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Ticket}/>
                            {ticketsCount}
                        </span>
                    </Button>
                    :
                    <div className={styles.progress_wrapper}>
                        <p className={TextXSRegular.update({ color: TextColor.Purple925 }).className}>
                            Farming...
                        </p>
                        <div className={FlexGapRow4.className}>
                            <HeroThugCoin height={24} width={24}/>
                            <p className={TextXSRegular.update({ color: TextColor.Purple925 }).className}>
                                {pointsCount}
                            </p>
                        </div>
                        <div className={FlexGapRow4.className}>
                            <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Ticket}/>
                            <p className={TextXSRegular.update({ color: TextColor.Purple925 }).className}>
                                {ticketsCount}
                            </p>
                        </div>
                        <div className={FlexGapRow4.className}>
                            <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Time}/>
                            <p className={TextXSRegular.update({ color: TextColor.Purple925 }).className}>
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