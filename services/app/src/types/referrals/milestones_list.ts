import { ApiTypeBuilder } from "@builders"
import { Milestone, MilestoneApi, MilestoneApiTypeBuilder } from "."

export type MilestonesListApi = {
    count: number,
    milestones: MilestoneApi[]
}

export type MilestonesList = {
    count: number,
    milestones: Milestone[]
}

export const MilestonesListApiTypeBuilder = new ApiTypeBuilder<MilestonesListApi, MilestonesList>(
    (i) => ({
        count: i.count,
        milestones: i.milestones.map(m => MilestoneApiTypeBuilder.convert(m))
    })
)