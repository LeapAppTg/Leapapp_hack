import { ApiError } from "@builders"
import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getInviteLink, getReferralsList, getUnclaimedPoints } from "@services"
import { InviteLink, ReferralsList, UnclaimedPoints } from "@types"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"

export function useUnclaimedPointsData () {
    const { authToken } = useAuth()
    return useSWR<UnclaimedPoints | undefined, ApiError, [ApiRoutes.GetUnclaimedPoints, string] | null>(
        authToken ? [ApiRoutes.GetUnclaimedPoints, authToken] : null,
        ([_, authToken]) => getUnclaimedPoints(authToken)
    )
}

export function useInviteLinkData () {
    const { authToken } = useAuth()
    return useSWR<InviteLink | undefined, ApiError, [ApiRoutes.GetInviteLink, string] | null>(
        authToken ? [ApiRoutes.GetInviteLink, authToken] : null,
        ([_, authToken]) => getInviteLink(authToken)
    )
}

export function useReferralsListData () {
    const { authToken } = useAuth()
    return useSWRInfinite(
        (pageIndex, prevData: ReferralsList) => {
            if (!authToken) return null
            if (prevData && prevData.totalReferrals <= pageIndex * 10) return null
            return [ApiRoutes.GetReferralsList, authToken, pageIndex]
        },
        ([_, authToken, pageIndex]) => getReferralsList(authToken, { limit: '10', offset: (10 * pageIndex).toString() }),
        {
            revalidateFirstPage: false
        }
    )
}