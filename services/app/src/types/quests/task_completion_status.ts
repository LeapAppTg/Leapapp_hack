import { ApiTypeBuilder } from "@builders"

export enum TaskCompletionStatus {
    Completed = 'completed',
    NotStarted = 'not_started'
}

const TaskCompletionStatusMapping: Record<string, TaskCompletionStatus> = {
    'completed': TaskCompletionStatus.Completed,
    'not_started': TaskCompletionStatus.NotStarted,
}

export const TaskCompletionStatusApiTypeBuilder = new ApiTypeBuilder<string, TaskCompletionStatus, false>(
    (i) => {
        return TaskCompletionStatusMapping[i] || TaskCompletionStatus.NotStarted
    }
)