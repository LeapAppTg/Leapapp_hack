import { ApiTypeBuilder } from "@builders"
import { EnumMatcher } from "@utils"

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

export const QuestStatusApiStringMatcher = new EnumMatcher<QuestStatus, string, 'in_progress'>(
    {
        [QuestStatus.InProgress]: 'in_progress',
        [QuestStatus.Completed]: 'completed',
        [QuestStatus.Claimed]: 'claimed'
    },
    'in_progress'
)

export const QuestStatusApiTypeBuilder = new ApiTypeBuilder<string, QuestStatus, false>(
    (i) => {
        return QuestStatusMapping[i] || QuestStatus.InProgress
    }
)