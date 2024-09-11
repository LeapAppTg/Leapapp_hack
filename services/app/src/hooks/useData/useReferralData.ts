import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getInviteLink, getReferralInfo, getReferralsCount, getReferralsList, getReferralsMilestonesList, getUnclaimedPoints } from "@services"
import { ReferralsList } from "@types"
import useSWR from "swr"
import useSWRInfinite from "swr/infinite"

export function useUnclaimedPointsData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetUnclaimedPoints, authToken] : null,
        ([_, authToken]) => getUnclaimedPoints(authToken)
    )
}

export function useReferralsCountData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetReferralsCount, authToken] : null,
        ([_, authToken]) => getReferralsCount(authToken)
    )
}

export function useReferralInfoData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetReferralInfo, authToken] : null,
        ([_, authToken]) => getReferralInfo(authToken)
    )
}

export function useInviteLinkData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetInviteLink, authToken] : null,
        ([_, authToken]) => getInviteLink(authToken)
    )
}

export function useReferralsListData () {
    const { authToken } = useAuth()
    return useSWRInfinite(
        (pageIndex, prevData: ReferralsList) => {
            if (!authToken) return null
            if (prevData && !prevData.next) return null
            return [ApiRoutes.GetReferralsList, authToken, pageIndex]
        },
        ([_, authToken, pageIndex]) => getReferralsList(authToken, { limit: '10', offset: (10 * pageIndex).toString() }),
        {
            revalidateFirstPage: false
        }
    )
}

export function useReferralsMilestonesListData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetReferralsMilestonesList, authToken] : null,
        ([_, authToken]) => getReferralsMilestonesList(authToken, {})
    )
}