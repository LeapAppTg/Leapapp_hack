import { ApiPostRequestBuilder, ApiTypeBuilder } from "@builders";

export async function postClaimTask (authToken: string | null, questId: number, taskId: number) {
    return new ApiPostRequestBuilder<{}, {}>({
        responseTypeBuilder: new ApiTypeBuilder((i) => i)
    })
    .setPath(`api/v1/game/quests/${questId}/${taskId}/`)
    .setAccessToken(authToken)
    .sendRequest()
}

export async function postClaimQuest (authToken: string | null, questId: number) {
    return new ApiPostRequestBuilder<{}, {}>({
        responseTypeBuilder: new ApiTypeBuilder((i) => i)
    })
    .setPath(`api/v1/game/quests/${questId}/`)
    .setAccessToken(authToken)
    .sendRequest()
}