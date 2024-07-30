import { ApiTypeBuilder } from "@builders"
import { Referral, ReferralApi, ReferralApiTypeBuilder } from "."

export type ReferralsListApi = {
    referrals: ReferralApi[],
    total_referrals: number
}

export type ReferralsList = {
    referrals: Referral[],
    totalReferrals: number
}

export const ReferralsListApiTypeBuilder = new ApiTypeBuilder<ReferralsListApi, ReferralsList>(
    (i) => ({
        referrals: i.referrals.map(r => ReferralApiTypeBuilder.convert(r)),
        totalReferrals: i.total_referrals
    })
)