import { ApiTypeBuilder } from "@builders"

export type ReferralApi = {
    username: string,
    points: number,
    first_name: string,
    last_name: string,
    referrals: number
}

export type Referral = {
    username: string,
    points: number,
    firstName: string,
    lastName: string,
    referrals: number
}

export const ReferralApiTypeBuilder = new ApiTypeBuilder<ReferralApi, Referral>(
    (i) => ({
        firstName: i.first_name,
        lastName: i.last_name,
        points: i.points,
        referrals: i.referrals,
        username: i.username
    })
)