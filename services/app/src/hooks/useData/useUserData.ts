import { ApiError } from "@builders"
import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getDailyReward, getHourlyReward, getUserProfile } from "@services"
import { DailyReward, HourlyReward, UserProfile } from "@types"
import useSWR from "swr"

export function useDailyRewardData () {
    const { authToken } = useAuth()
    return useSWR<DailyReward | undefined, ApiError, [ApiRoutes.GetDailyReward, string] | null>(
        authToken ? [ApiRoutes.GetDailyReward, authToken] : null,
        ([_, authToken]) => getDailyReward(authToken)
    )
}

export function useHourlyRewardData () {
    const { authToken } = useAuth()
    return useSWR<HourlyReward | undefined, ApiError, [ApiRoutes.GetHourlyReward, string] | null>(
        authToken ? [ApiRoutes.GetHourlyReward, authToken] : null,
        ([_, authToken]) => getHourlyReward(authToken)
    )
}

export function useUserProfileData () {
    const { authToken } = useAuth()
    return useSWR<UserProfile | undefined, ApiError, [ApiRoutes.GetUserProfile, string] | null>(
        authToken ? [ApiRoutes.GetUserProfile, authToken] : null,
        ([_, authToken]) => getUserProfile(authToken)
    )
}