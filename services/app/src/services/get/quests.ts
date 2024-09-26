import { ApiGetParamsBuilder, ApiGetRequestBuilder } from "@builders";
import { ApiMultipleQueryTypeBuilder, QuestApiTypeBuilder } from "@types";

type GetQuestsParams = {
    category?: string,
    objective_type?: string,
    status?: string[],
    limit?: string,
    offset?: string
}

export async function getQuests (accessToken: string, params: GetQuestsParams) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/quests/',
        typeBuilder: new ApiMultipleQueryTypeBuilder(QuestApiTypeBuilder),
        paramsBuilder: new ApiGetParamsBuilder<GetQuestsParams>()
    })
    .setAccessToken(accessToken)
    .setParams(params)
    .sendRequest()
}