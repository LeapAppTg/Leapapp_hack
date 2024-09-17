import { ApiTypeBuilder } from "@builders"

export type ReferralInfoApi = {
    invited_users_count: number,
    claimed_points_count: number
}

export type ReferralInfo = {
    invitedUsersCount: number,
    claimedPointsCount: number
}

export const ReferralInfoApiTypeBuilder = new ApiTypeBuilder<ReferralInfoApi, ReferralInfo>(
    (i) => ({
        claimedPointsCount: i.claimed_points_count,
        invitedUsersCount: i.invited_users_count
    })
)