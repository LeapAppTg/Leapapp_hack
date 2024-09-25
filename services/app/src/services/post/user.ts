import { ApiPostRequestBuilder, ApiTypeBuilder } from "@builders";

export async function postDailyReward (accessToken: string) {
    return new ApiPostRequestBuilder<{}, {}>({
        path: 'api/v1/game/daily-reward/',
        responseTypeBuilder: new ApiTypeBuilder(i => i)
    })
    .setAccessToken(accessToken)
    .sendRequest()
}