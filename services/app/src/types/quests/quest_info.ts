import { ApiTypeBuilder } from "@builders"
import { QuestCategory, QuestCategoryApiTypeBuilder, QuestCompletionStatus, QuestCompletionStatusApiTypeBuilder, QuestStatus, QuestStatusApiTypeBuilder } from "."

export type QuestInfoApi = {
    uuid: number,
    name: string,
    status: string,
    category: string,
    completion_status: string,
    reward_points: number | null,
    reward_game_tickets: number | null,
    quest_start_time: number,
    quest_end_time: number
}

export type QuestInfo = {
    uuid: number,
    name: string,
    status: QuestStatus,
    category: QuestCategory,
    completionStatus: QuestCompletionStatus,
    rewardPoints: number,
    rewardGameTickets: number,
    questStartTime: number,
    questEndTime: number
}

export const QuestInfoApiTypeBuilder = new ApiTypeBuilder<QuestInfoApi, QuestInfo>(
    (i) => ({
        uuid: i.uuid,
        name: i.name,
        status: QuestStatusApiTypeBuilder.convert(i.status),
        category: QuestCategoryApiTypeBuilder.convert(i.category),
        completionStatus: QuestCompletionStatusApiTypeBuilder.convert(i.completion_status),
        rewardPoints: i.reward_points || 0,
        rewardGameTickets: i.reward_game_tickets || 0,
        questStartTime: i.quest_start_time,
        questEndTime: i.quest_end_time
    })
)