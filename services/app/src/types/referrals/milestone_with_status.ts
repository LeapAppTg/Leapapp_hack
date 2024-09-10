import { ApiTypeBuilder } from "@builders"
import { Milestone, MilestoneApi, MilestoneApiTypeBuilder } from "."

export type MilestoneWithStatusApi = {
    is_claimed: boolean,
    milestone: MilestoneApi
}

export type MilestoneWithStatus = {
    isClaimed: boolean,
    milestone: Milestone
}

export const MilestoneWithStatusApiTypeBuilder = new ApiTypeBuilder<MilestoneWithStatusApi, MilestoneWithStatus>(
    (i) => ({
        isClaimed: i.is_claimed,
        milestone: MilestoneApiTypeBuilder.convert(i.milestone)
    })
)