import { ApiGetParamsBuilder, ApiGetRequestBuilder } from "@builders";
import { QuestDetailsApiTypeBuilder, QuestsListApiTypeBuilder } from "@types";

export async function getQuestsList (accessToken: string) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/game/quests/',
        typeBuilder: QuestsListApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setAccessToken(accessToken)
    .sendRequest()
}

export async function getQuestDetails (accessToken: string, questUuid: number) {
    return new ApiGetRequestBuilder({
        typeBuilder: QuestDetailsApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setPath(`api/v1/game/quests/${questUuid}/`)
    .setAccessToken(accessToken)
    .sendRequest()
}