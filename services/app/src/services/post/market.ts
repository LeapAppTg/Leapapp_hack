import { ApiPostRequestBuilder, ApiTypeBuilder } from "@builders";

export async function postUpgradeMarketItem (authToken: string | null, id: number) {
    return new ApiPostRequestBuilder<{}, {}>({
        path: `api/v1/market/items/${id.toString()}/`,
        responseTypeBuilder: new ApiTypeBuilder((i) => i)
    })
    .setAccessToken(authToken)
    .sendRequest()
}