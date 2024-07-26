import { ApiPostRequestBuilder, ApiTypeBuilder } from "@builders";

type PostStartGameResponse = {
    detail: string,
    records: number
}

export async function postStartGame (authToken: string | null) {
    return new ApiPostRequestBuilder<PostStartGameResponse, PostStartGameResponse>({
        path: 'api/v1/game/start-game/',
        responseTypeBuilder: new ApiTypeBuilder((i) => i)
    })
    .setAccessToken(authToken)
    .sendRequest()
}

type PostEndGameResponse = {
    status: string,
    points: number,
    record: number
}

export async function postEndGame (authToken: string | null, points: number) {
    return new ApiPostRequestBuilder<PostEndGameResponse, PostEndGameResponse>({
        path: 'api/v1/game/end-game/',
        responseTypeBuilder: new ApiTypeBuilder((i) => i),
    })
    .setAccessToken(authToken)
    .setParams({
        points,
        record: points
    })
    .sendRequest()
}