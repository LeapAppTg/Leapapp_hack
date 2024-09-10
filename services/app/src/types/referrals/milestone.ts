import { ApiTypeBuilder } from "@builders"

export type MilestoneApi = {
    uuid: number,
    referrals_milestone: number,
    points_reward: number
}

export type Milestone = {
    uuid: number,
    referralsMilestone: number,
    pointsReward: number
}

export const MilestoneApiTypeBuilder = new ApiTypeBuilder<MilestoneApi, Milestone>(
    (i) => ({
        uuid: i.uuid,
        pointsReward: i.points_reward,
        referralsMilestone: i.referrals_milestone
    })
)