import { ApiTypeBuilder } from "@builders"

export type ReferralsCountApi = {
    count: number
}

export type ReferralsCount = {
    count: number
}

export const ReferralsCountApiTypeBuilder = new ApiTypeBuilder<ReferralsCountApi, ReferralsCount>(
    (i) => ({
        count: i.count
    })
)