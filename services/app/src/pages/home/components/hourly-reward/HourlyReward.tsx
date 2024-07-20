import { ApiError } from "@builders";
import { AlertStatus, Button, ButtonStyle, ContentBlock } from "@components";
import { ApiRoutes, useData, useUnixTimestamp } from "@hooks";
import { FrogIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { useAlerts, useAuth } from "@providers";
import { postHourlyReward } from "@services";
import { FlexGapRow12FullWidth, FlexGapRow4FullWidth, TextColor, TextMSemiBold, TextXSMedium, TextXSRegular, TimeObject, classJoiner } from "@utils";
import { FC, useMemo } from "react";
import styles from "./styles.module.css";

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
        return [(progress * data.gameTickets).format(), (progress * data.points).format(undefined, 2), false, TimeObject.fromTimestamp(timeLeft * 1000).toDisplayString(3), Math.floor(progress * 100)]
    }, [data, timestamp])

    async function onClaim () {
        if (!data || !data.canClaim || !authToken) return

        try {
            await postHourlyReward(authToken)
            sendAlert({
                message: `Claimed +${data.points.format(undefined, 2)} points +${data.gameTickets.format()} tickets`,
                status: AlertStatus.Success,
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
        <ContentBlock>
            <p className={TextMSemiBold.className}>Farming</p>
            <div className={FlexGapRow12FullWidth.className}>
                <div className={FlexGapRow4FullWidth.className}>
                    <p className={classJoiner(TextXSRegular.className, styles.extra_margin)}>$LEAP:</p>
                    <IconBox icon={PointsIcon} size={IconSize.Medium}/>
                    <p className={TextXSMedium.className}>{pointsCount}</p>
                </div>
                <div className={FlexGapRow4FullWidth.className}>
                    <p className={classJoiner(TextXSRegular.className, styles.extra_margin)}>Games:</p>
                    <IconBox icon={FrogIcon} size={IconSize.Medium}/>
                    <p className={TextXSMedium.className}>{ticketsCount}</p>
                </div>
            </div>
            {
                canClaim
                ?
                <Button style={ButtonStyle.Primary} fillFullWidth onClick={onClaim}>
                    Claim
                </Button>
                :
                <div className={styles.progress_wrapper}>
                    <p className={TextXSRegular.update({ color: TextColor.Purple925 }).className}>
                        Farming... {timeLeft}
                    </p>
                    <div className={styles.progress} style={{ width: `${progress < 5 ? 95 : progress > 95 ? 5 : 100 - progress}%` }}/>
                </div>
            }
        </ContentBlock>
    )
}