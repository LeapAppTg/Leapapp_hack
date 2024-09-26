import { ApiTypeBuilder } from "@builders"
import { QuestCategory, QuestCategoryApiTypeBuilder, QuestObjective, QuestObjectiveApi, QuestObjectiveApiTypeBuilder, QuestStatus, QuestStatusApiTypeBuilder } from "."
import { ApiArrayTypeBuilder } from "../query_multiple"

export type QuestApi = {
    id: string,
    name: string,
    category: string,
    reward_points: number,
    status: string,
    objective: QuestObjectiveApi,
    active_since: string | null,
    active_until: string | null
}

export type Quest = {
    id: string,
    name: string,
    category: QuestCategory,
    rewardPoints: number,
    status: QuestStatus,
    objective: QuestObjective,
    active_since: Date | null,
    active_until: Date | null
}

export const QuestApiTypeBuilder = new ApiTypeBuilder<QuestApi, Quest>(
    (i) => ({
        id: i.id,
        name: i.name,
        category: QuestCategoryApiTypeBuilder.convert(i.category),
        rewardPoints: i.reward_points,
        status: QuestStatusApiTypeBuilder.convert(i.status),
        objective: QuestObjectiveApiTypeBuilder.convert(i.objective),
        active_since: i.active_since ? new Date(i.active_since) : null,
        active_until: i.active_until ? new Date(i.active_until) : null
    })
)

export const QuestsListApiTypeBuilder = new ApiArrayTypeBuilder(QuestApiTypeBuilder)