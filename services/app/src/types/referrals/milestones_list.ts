import { ApiTypeBuilder } from "@builders"
import { MilestoneWithStatus, MilestoneWithStatusApi, MilestoneWithStatusApiTypeBuilder, Referral, ReferralApi, ReferralApiTypeBuilder } from "."

export type MilestonesListApi = {
    count: number,
    milestones: MilestoneWithStatusApi[]
}

export type MilestonesList = {
    count: number,
    milestones: MilestoneWithStatus[]
}

export const MilestonesListApiTypeBuilder = new ApiTypeBuilder<MilestonesListApi, MilestonesList>(
    (i) => ({
        count: i.count,
        milestones: i.milestones.map(m => MilestoneWithStatusApiTypeBuilder.convert(m))
    })
)