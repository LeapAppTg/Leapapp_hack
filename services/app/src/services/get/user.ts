import { ApiGetParamsBuilder, ApiGetRequestBuilder } from "@builders";
import { DailyRewardApiTypeBuilder, HourlyRewardApiTypeBuilder, UserProfileApiTypeBuilder } from "@types";

export async function getDailyReward (accessToken: string) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/game/daily-reward/',
        typeBuilder: DailyRewardApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setAccessToken(accessToken)
    .sendRequest()
}

export async function getHourlyReward (accessToken: string) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/game/hours-reward/',
        typeBuilder: HourlyRewardApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setAccessToken(accessToken)
    .sendRequest()
}

export async function getUserProfile (accessToken: string) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/user/',
        typeBuilder: UserProfileApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setAccessToken(accessToken)
    .sendRequest()
}