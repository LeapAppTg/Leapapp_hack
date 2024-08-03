import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getGameLeaderboard } from "@services"
import useSWR from "swr"

export function useGameLeaderboardData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetGameLeaderboard, authToken] : null,
        ([_, authToken]) => getGameLeaderboard(authToken)
    )
}