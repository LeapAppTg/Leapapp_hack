import { ApiTypeBuilder } from "@builders"
import { Milestone, MilestoneApi, MilestoneApiTypeBuilder } from "."

export type MilestoneWithStatusApi = {
    is_claimed: boolean,
    claimed_at: string,
    milestone: MilestoneApi
}

export type MilestoneWithStatus = {
    isClaimed: boolean,
    claimedAt: Date,
    milestone: Milestone
}

export const MilestoneWithStatusApiTypeBuilder = new ApiTypeBuilder<MilestoneWithStatusApi, MilestoneWithStatus>(
    (i) => ({
        isClaimed: i.is_claimed,
        claimedAt: new Date(i.claimed_at),
        milestone: MilestoneApiTypeBuilder.convert(i.milestone)
    })
)