import { HeroThugCoin } from "@assets";
import { AlertStatus, Button, ButtonStyle } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { useAlerts, useAuth } from "@providers";
import { postClaimReferralsPoints } from "@services";
import { FlexGapRow4 } from "@utils";
import { FC } from "react";

export const ClaimButton: FC = () => {

    const { data: unclaimedPoints, mutate } = useData(ApiRoutes.GetUnclaimedPoints)
    const { sendAlert, sendApiErrorAlert } = useAlerts()
    const { authToken } = useAuth()

    async function onClaim () {
        try {
            await postClaimReferralsPoints(authToken)
            sendAlert({
                status: AlertStatus.Success,
                message: `Claimed +${unclaimedPoints?.count.format("default", 2)} points`,
                withConfetti: true
            })
            mutate({ count: 0 })
        } catch (e) {
            sendApiErrorAlert(e)
        }
    }

    if (!unclaimedPoints || !unclaimedPoints.count) return (
        <Button fillFullWidth style={ButtonStyle.Secondary} disabled>
            Nothing to claim
        </Button>
    )

    return (
        <Button fillFullWidth style={ButtonStyle.Secondary} onClick={onClaim}>
            Claim
            <span className={FlexGapRow4.className}>
                <HeroThugCoin width={20} height={20}/>
                {unclaimedPoints.count.format("default", 2)}
            </span>
        </Button>
    )
}