import { ApiTypeBuilder } from "@builders"

export type ReferralApi = {
    username: string,
    points: number,
    referrals: number
}

export type Referral = {
    username: string,
    points: number,
    referrals: number
}

export const ReferralApiTypeBuilder = new ApiTypeBuilder<ReferralApi, Referral>(
    (i) => i
)