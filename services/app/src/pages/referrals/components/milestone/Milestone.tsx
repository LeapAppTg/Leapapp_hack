import { ElementRef, FC, useEffect, useMemo, useRef } from "react";
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
    prevClaimed?: boolean,
    isFirst?: boolean,
    claimCallback: (uuid: number) => any
}

export const Milestone: FC<MilestoneProps> = ({
    isClaimed, prevClaimed, pointsReward, referralsMilestone, uuid, claimCallback, isFirst
}) => {

    const ref = useRef<ElementRef<"div">>(null)

    const { authToken } = useAuth()
    const { sendAlert, sendApiErrorAlert } = useAlerts()
    const { data: referralsCount } = useData(ApiRoutes.GetReferralsCount)

    const isClaimable = useMemo(() => {
        if (prevClaimed || isFirst) {
            if (isClaimed) return false
            if (referralsCount?.count || 0 >= referralsMilestone) return true
        }
        return false
    }, [referralsCount, isClaimed, prevClaimed])

    async function onClaim () {
        try {
            await postClaimReferralsMilestoneReward(authToken, uuid)
            sendAlert({
                message: `Claimed +${pointsReward.format()} points`,
                status: AlertStatus.Success,
                withConfetti: true
            })
            claimCallback(uuid)
        } catch (e) {
            sendApiErrorAlert(e)
        }
    }

    useEffect(() => {
        if (!isClaimed && (prevClaimed || isFirst)) {
            ref.current?.scrollIntoView({ inline: "center", behavior: "instant" })
        }
    }, [ref.current])

    return (
        <div className={FlexGapColumn4.withExtraClasses(styles.wrapper)} ref={ref}>
            <p className={TextXXSRegularGrey400.className}>
                Invite
                {isClaimed ? "d" : null}
            </p>
            <p className={TextSSemiBold.className}>
                {referralsMilestone.format()}
            </p>
            <div className={classJoiner(styles.icon_wrapper, isClaimed ? styles.claimed : prevClaimed ? styles.next_goal : undefined)}>
                {
                    isClaimed
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
                    {isClaimed ? "ed" : null}
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