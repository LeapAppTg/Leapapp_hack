import { FC, useMemo } from "react";
import styles from "./styles.module.css";
import { FlexGapColumn4, FlexGapRow4, TextSSemiBold, TextXSRegular, TextXXSRegularGrey400, classJoiner } from "@utils";
import { Coin } from "@assets";
import { CheckmarkIcon, IconBox, IconSize, UserProfileIcon } from "@icons";
import { AlertStatus, Button, ButtonStyle, CircleIconWrapper, CircleIconWrapperColor } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { postClaimReferralsMilestoneReward } from "@services";
import { useAlerts, useAuth } from "@providers";
import { Milestone as MilestoneT } from "@types";

type MilestoneProps = MilestoneT & {
    claimed?: boolean,
    prevClaimed?: boolean
}

export const Milestone: FC<MilestoneProps> = ({
    claimed, prevClaimed, pointsReward, referralsMilestone, uuid
}) => {

    const { authToken } = useAuth()
    const { sendAlert, sendApiErrorAlert } = useAlerts()
    const { data: referralsCount } = useData(ApiRoutes.GetReferralsCount)

    const isClaimable = useMemo(() => claimed ? false : 3 >= referralsMilestone ? true : false, [referralsCount, claimed])

    async function onClaim () {
        try {
            await postClaimReferralsMilestoneReward(authToken, uuid)
            sendAlert({
                message: `Claimed +${pointsReward.format()} points`,
                status: AlertStatus.Success,
                withConfetti: true
            })
        } catch (e) {
            sendApiErrorAlert(e)
        }
    }

    return (
        <div className={FlexGapColumn4.withExtraClasses(styles.wrapper)}>
            <p className={TextXXSRegularGrey400.className}>
                Invite
                {claimed ? "d" : null}
            </p>
            <p className={TextSSemiBold.className}>
                {referralsMilestone.format()}
            </p>
            <div className={classJoiner(styles.icon_wrapper, claimed ? styles.claimed : prevClaimed ? styles.next_goal : undefined)}>
                {
                    claimed
                    ?
                    <CircleIconWrapper color={CircleIconWrapperColor.Green600} icon={CheckmarkIcon}/>
                    :
                    <IconBox icon={UserProfileIcon} size={IconSize.MediumBig}/>
                }
            </div>
            {
                isClaimable
                ?
                <Button style={ButtonStyle.Primary} className={styles.button} onClick={onClaim}>
                    Claim
                    <PointsWrapper points={pointsReward}/>
                </Button>
                :
                <>
                <p className={TextXXSRegularGrey400.className}>
                    Reward
                    {claimed ? "ed" : null}
                </p>
                <PointsWrapper points={pointsReward}/>
                </>
            }
        </div>
    )
}

const PointsWrapper: FC<{ points: number }> = ({ points }) => {
    return (
        <span className={FlexGapRow4.className}>
            <Coin width={24} height={24}/>
            <p className={TextXSRegular.update({ noLineBreak: true }).className}>
                {points.format()}
            </p>
        </span>
    )
}