import { ApiGetParamsBuilder, ApiGetRequestBuilder } from "@builders";
import { InviteLinkApiTypeBuilder, ReferralsListApiTypeBuilder, UnclaimedPointsApiTypeBuilder } from "@types";

export async function getInviteLink (accessToken: string) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/referrals/invite-link/',
        typeBuilder: InviteLinkApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setAccessToken(accessToken)
    .sendRequest()
}

export async function getUnclaimedPoints (accessToken: string) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/referrals/unclaimed-points/',
        typeBuilder: UnclaimedPointsApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<Record<string, never>>()
    })
    .setAccessToken(accessToken)
    .sendRequest()
}

type GetReferralsListParams = {
    limit?: string,
    offset?: string,
}

export async function getReferralsList (accessToken: string, params: GetReferralsListParams) {
    return new ApiGetRequestBuilder({
        path: 'api/v1/referrals/',
        typeBuilder: ReferralsListApiTypeBuilder,
        paramsBuilder: new ApiGetParamsBuilder<GetReferralsListParams>()
    })
    .setAccessToken(accessToken)
    .setParams(params)
    .sendRequest()
}