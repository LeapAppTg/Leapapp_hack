import { ApiTypeBuilder } from "@builders"

export enum QuestCompletionStatus {
    Completed = 'completed',
    Claimed = 'claimed',
    NotStarted = 'not_started'
}

const QuestCompletionStatusMapping: Record<string, QuestCompletionStatus> = {
    'completed': QuestCompletionStatus.Completed,
    'claimed': QuestCompletionStatus.Claimed,
    'not_started': QuestCompletionStatus.NotStarted,
}

export const QuestCompletionStatusApiTypeBuilder = new ApiTypeBuilder<string, QuestCompletionStatus, false>(
    (i) => {
        return QuestCompletionStatusMapping[i] || QuestCompletionStatus.NotStarted
    }
)