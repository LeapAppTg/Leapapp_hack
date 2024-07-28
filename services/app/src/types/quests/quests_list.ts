import { ApiTypeBuilder } from "@builders"
import { QuestInfo, QuestInfoApi, QuestInfoApiTypeBuilder } from "."

export type QuestsListApi = {
    quests: QuestInfoApi[],
    total_claimed_points: number
}

export type QuestsList = {
    quests: QuestInfo[],
    totalClaimedPoints: number
}

export const QuestsListApiTypeBuilder = new ApiTypeBuilder<QuestsListApi, QuestsList>(
    (i) => ({
        quests: i.quests.map(q => QuestInfoApiTypeBuilder.convert(q)),
        totalClaimedPoints: i.total_claimed_points
    })
)