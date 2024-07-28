import { ApiTypeBuilder } from "@builders"
import { TaskCompletionStatus, TaskCompletionStatusApiTypeBuilder, TaskType, TaskTypeApiTypeBuilder } from "."

export type QuestTaskApi = {
    uuid: number,
    type: string,
    name: string,
    description: string,
    link: string,
    completion_status: string
}

export type QuestTask = {
    uuid: number,
    type: TaskType,
    name: string,
    description: string,
    link: string,
    completionStatus: TaskCompletionStatus
}

export const QuestTaskApiTypeBuilder = new ApiTypeBuilder<QuestTaskApi, QuestTask>(
    (i) => ({
        uuid: i.uuid,
        name: i.name,
        description: i.description,
        link: i.link,
        completionStatus: TaskCompletionStatusApiTypeBuilder.convert(i.completion_status),
        type: TaskTypeApiTypeBuilder.convert(i.type)
    })
)