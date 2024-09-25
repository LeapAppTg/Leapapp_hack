import { ApiTypeBuilder } from "@builders"

export enum QuestStatus {
    InProgress = 'in_progress',
    Completed = 'completed',
    Claimed = 'claimed'
}

const QuestStatusMapping: Record<string, QuestStatus> = {
    'in_progress': QuestStatus.InProgress,
    'completed': QuestStatus.Completed,
    'claimed': QuestStatus.Claimed
}

export const QuestStatusApiTypeBuilder = new ApiTypeBuilder<string, QuestStatus, false>(
    (i) => {
        return QuestStatusMapping[i] || QuestStatus.InProgress
    }
)