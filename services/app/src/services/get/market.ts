import { ApiGetParamsBuilder, ApiGetRequestBuilder } from "@builders";
import { MarketItemsListApiTypeBuilder } from "@types";

export async function getMarketItemsList (accessToken: string) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/market/items/',
        typeBuilder: MarketItemsListApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setAccessToken(accessToken)
    .sendRequest()
}