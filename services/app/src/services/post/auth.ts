import { ApiPostRequestBuilder, ApiTypeBuilder } from "@builders";

type PostTokenRefreshResponse = {
    access_token: string
}

export async function postTokenRefresh () {
    return new ApiPostRequestBuilder<PostTokenRefreshResponse, PostTokenRefreshResponse>({
        path: 'api/v1/auth/refresh/',
        responseTypeBuilder: new ApiTypeBuilder((i) => i)
    })
    .sendRequest()
}

export async function postUserAuth (initData: string, refCode?: string) {
    return new ApiPostRequestBuilder<PostTokenRefreshResponse, PostTokenRefreshResponse>({
        path: 'api/v1/auth/',
        responseTypeBuilder: new ApiTypeBuilder((i) => i),
    })
    .setParams({
        initData,
        referral_code: refCode
    })
    .sendRequest()
}