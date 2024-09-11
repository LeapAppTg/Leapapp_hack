import { ApiTypeBuilder } from "@builders"

export type MilestoneApi = {
    uuid: number,
    referrals_milestone: number,
    points_reward: number,
    is_claimed: boolean,
    claimed_at: string | null
}

export type Milestone = {
    uuid: number,
    referralsMilestone: number,
    pointsReward: number,
    isClaimed: boolean,
    claimedAt: Date | null
}

export const MilestoneApiTypeBuilder = new ApiTypeBuilder<MilestoneApi, Milestone>(
    (i) => ({
        uuid: i.uuid,
        pointsReward: i.points_reward,
        referralsMilestone: i.referrals_milestone,
        isClaimed: i.is_claimed,
        claimedAt: i.claimed_at ? new Date(i.claimed_at) : null
    })
)