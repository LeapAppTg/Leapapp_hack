import { ApiTypeBuilder } from "@builders"

export enum QuestStatus {
    Upcoming = 'upcoming',
    Active = 'active',
    Finished = 'finished',
    Locked = 'locked'
}

const QuestStatusMapping: Record<string, QuestStatus> = {
    'upcoming': QuestStatus.Upcoming,
    'active': QuestStatus.Active,
    'finished': QuestStatus.Finished,
    'locked': QuestStatus.Locked
}

export const QuestStatusApiTypeBuilder = new ApiTypeBuilder<string, QuestStatus, false>(
    (i) => {
        return QuestStatusMapping[i] || QuestStatus.Upcoming
    }
)