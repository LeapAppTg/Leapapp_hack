import { ApiTypeBuilder } from "@builders"
import { QuestType, QuestTypeApiTypeBuilder } from "."

export type LinkQuestObjectiveApi = {
    type: string,
    url: string
}

export type LinkQuestObjective = {
    type: QuestType.Link | QuestType.TelegramLink,
    url: string
}

export type UserMilestoneQuestObjectiveApi = {
    type: string,
    goal: number,
    progress: number
}

export type UserMilestoneQuestObjective = {
    type: QuestType.PointsMilestone | QuestType.ReferralsMilestone | QuestType.ConsecutiveDaysMilestone,
    goal: number,
    progress: number
}

export type QuestObjectiveApi = LinkQuestObjectiveApi | UserMilestoneQuestObjectiveApi
export type QuestObjective = LinkQuestObjective | UserMilestoneQuestObjective

export function isLinkQuestObjective (objective: QuestObjective): objective is LinkQuestObjective {
    return objective.type === QuestType.Link || objective.type === QuestType.TelegramLink
}
export function isUserMilestoneQuestObjective (objective: QuestObjective): objective is UserMilestoneQuestObjective {
    return objective.type === QuestType.ConsecutiveDaysMilestone || objective.type === QuestType.ReferralsMilestone || objective.type === QuestType.PointsMilestone
}

const validateObject = (obj: QuestObjectiveApi) => {
    const type = QuestTypeApiTypeBuilder.convert(obj.type)
    if (type === QuestType.Link || type === QuestType.TelegramLink) return [true, type as LinkQuestObjective["type"], obj as LinkQuestObjectiveApi] as const
    return [false, type as UserMilestoneQuestObjective["type"], obj as UserMilestoneQuestObjectiveApi] as const
}

export const QuestObjectiveApiTypeBuilder = new ApiTypeBuilder<QuestObjectiveApi, QuestObjective>(
    (i) => {
        const [isLink, type, obj] = validateObject(i)
        if (isLink) return {
            type,
            url: obj.url
        }
        return {
            type,
            goal: obj.goal,
            progress: obj.progress
        }
    }
)