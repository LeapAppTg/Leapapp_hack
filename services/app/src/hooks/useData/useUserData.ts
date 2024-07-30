import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getDailyReward, getHourlyReward, getUserProfile } from "@services"
import useSWR from "swr"

export function useDailyRewardData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetDailyReward, authToken] : null,
        ([_, authToken]) => getDailyReward(authToken)
    )
}

export function useHourlyRewardData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetHourlyReward, authToken] : null,
        ([_, authToken]) => getHourlyReward(authToken)
    )
}

export function useUserProfileData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetUserProfile, authToken] : null,
        ([_, authToken]) => getUserProfile(authToken)
    )
}