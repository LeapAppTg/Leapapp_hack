import { ElementRef, FC, useEffect, useMemo, useRef } from "react";
import styles from "./styles.module.css";
import { FlexGapColumn4, FlexGapRow4, TextColor, TextSSemiBold, TextXSRegular, TextXXSRegularGrey400, classJoiner } from "@utils";
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
            if (isClaimed || !referralsCount) return false
            if (referralsCount.count >= referralsMilestone) return true
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
            setTimeout(() => ref.current?.scrollIntoView({ inline: "center", behavior: "smooth" }), 20)
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
            <div className={classJoiner(styles.icon_wrapper, isClaimed ? styles.claimed : (prevClaimed || isFirst) ? styles.next_goal : undefined)}>
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
                <PointsWrapper points={pointsReward} isClaimed={isClaimed}/>
                </>
            }
        </div>
    )
}

const PointsWrapper: FC<{ points: number, isClaimed?: boolean }> = ({ points, isClaimed }) => {
    return (
        <span className={FlexGapRow4.className}>
            <Coin width={24} height={24}/>
            <p className={TextXSRegular.update({ noLineBreak: true, color: isClaimed ? TextColor.Grey400 : undefined }).className}>
                {points.format()}
            </p>
        </span>
    )
}