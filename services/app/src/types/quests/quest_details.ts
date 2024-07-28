import { ApiTypeBuilder } from "@builders"
import { QuestInfo, QuestInfoApi, QuestInfoApiTypeBuilder, QuestTask, QuestTaskApi, QuestTaskApiTypeBuilder } from "."

export type QuestDetailsApi = {
    quest: QuestInfoApi,
    tasks: QuestTaskApi[]
}

export type QuestDetails = {
    quest: QuestInfo,
    tasks: QuestTask[]
}

export const QuestDetailsApiTypeBuilder = new ApiTypeBuilder<QuestDetailsApi, QuestDetails>(
    (i) => ({
        quest: QuestInfoApiTypeBuilder.convert(i.quest),
        tasks: i.tasks.map(t => QuestTaskApiTypeBuilder.convert(t))
    })
)