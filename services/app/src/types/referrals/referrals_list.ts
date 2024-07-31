import { ApiTypeBuilder } from "@builders"
import { Referral, ReferralApi, ReferralApiTypeBuilder } from "."

export type ReferralsListApi = {
    referrals: ReferralApi[],
    next: boolean
}

export type ReferralsList = {
    referrals: Referral[],
    next: boolean
}

export const ReferralsListApiTypeBuilder = new ApiTypeBuilder<ReferralsListApi, ReferralsList>(
    (i) => ({
        referrals: i.referrals.map(r => ReferralApiTypeBuilder.convert(r)),
        next: i.next
    })
)