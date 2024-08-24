import { ApiTypeBuilder } from "@builders"
import { QuestType, QuestTypeApiTypeBuilder } from "."
import { ApiArrayTypeBuilder } from "../query_multiple"

export type QuestApi = {
    uuid: number,
    name: string,
    type: string,
    link?: string,
    is_claimed: boolean,
    required?: number,
    progress?: number,
    reward_points: number,
    reward_game_tickets?: number,
}

export type Quest = {
    uuid: number,
    name: string,
    type: QuestType,
    link: string | null,
    isClaimed: boolean,
    required: number | null,
    progress: number | null,
    rewardPoints: number,
    rewardGameTickets: number | null
}

export const QuestApiTypeBuilder = new ApiTypeBuilder<QuestApi, Quest>(
    (i) => ({
        uuid: i.uuid,
        name: i.name,
        type: QuestTypeApiTypeBuilder.convert(i.type),
        link: i.link || null,
        isClaimed: i.is_claimed,
        required: i.required === undefined ? null : i.required,
        progress: i.progress === undefined ? null : i.progress,
        rewardPoints: i.reward_points,
        rewardGameTickets: i.reward_game_tickets || null
    })
)

export const QuestsListApiTypeBuilder = new ApiArrayTypeBuilder(QuestApiTypeBuilder)