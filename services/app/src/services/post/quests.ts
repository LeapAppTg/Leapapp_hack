import { ApiPostRequestBuilder, ApiTypeBuilder } from "@builders";

export async function postClaimQuest (authToken: string | null, questId: string) {
    return new ApiPostRequestBuilder<{}, {}>({
        responseTypeBuilder: new ApiTypeBuilder((i) => i)
    })
    .setPath(`api/v1/quests/${questId}/`)
    .setAccessToken(authToken)
    .sendRequest()
}