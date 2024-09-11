import { ApiPostRequestBuilder, ApiTypeBuilder } from "@builders";

export async function postClaimReferralsPoints (authToken: string | null) {
    return new ApiPostRequestBuilder<{}, {}>({
        path: 'api/v1/referrals/claim-points/',
        responseTypeBuilder: new ApiTypeBuilder((i) => i)
    })
    .setAccessToken(authToken)
    .sendRequest()
}

export async function postClaimReferralsMilestoneReward (authToken: string | null, milestoneId: number) {
    return new ApiPostRequestBuilder<{}, {}>({
        path: `api/v1/referrals/milestones/${milestoneId}`,
        responseTypeBuilder: new ApiTypeBuilder((i) => i)
    })
    .setAccessToken(authToken)
    .sendRequest()
}