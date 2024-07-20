import { ApiError } from "@builders"
import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getDailyReward, getHourlyReward, getUserProfile } from "@services"
import { DailyReward, HourlyReward, UserProfile } from "@types"
import useSWR from "swr"

export function useDailyRewardData () {
    const { authToken } = useAuth()
    return useSWR<DailyReward | undefined, ApiError, [ApiRoutes.GetDailyReward, string]>(
        authToken ? [ApiRoutes.GetDailyReward, authToken] : undefined,
        ([_, authToken]) => getDailyReward(authToken)
    )
}

export function useHourlyRewardData () {
    const { authToken } = useAuth()
    return useSWR<HourlyReward | undefined, ApiError, [ApiRoutes.GetHourlyReward, string]>(
        authToken ? [ApiRoutes.GetHourlyReward, authToken] : undefined,
        ([_, authToken]) => getHourlyReward(authToken)
    )
}

export function useUserProfileData () {
    const { authToken } = useAuth()
    return useSWR<UserProfile | undefined, ApiError, [ApiRoutes.GetUserProfile, string]>(
        authToken ? [ApiRoutes.GetUserProfile, authToken] : undefined,
        ([_, authToken]) => getUserProfile(authToken)
    )
}