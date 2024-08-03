import { ApiGetParamsBuilder, ApiGetRequestBuilder } from "@builders";
import { GameLeaderboardApiTypeBuilder } from "@types";

export async function getGameLeaderboard (accessToken: string) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/leaderboard/game/',
        typeBuilder: GameLeaderboardApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setAccessToken(accessToken)
    .sendRequest()
}