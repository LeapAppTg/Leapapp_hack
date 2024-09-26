import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getQuests } from "@services"
import { QuestCategory, QuestCategoryApiStringMatcher, QuestStatus, QuestStatusApiStringMatcher } from "@types"
import { TypeOrArrayOrNullOrUndefined, enumOrArrayOrNullToApiArray } from "@utils"
import useSWR from "swr"

export type UseQuestsDataProps = [category?: QuestCategory | null | undefined, status?: TypeOrArrayOrNullOrUndefined<QuestStatus>]

export function useQuestsData (...[category, status]: UseQuestsDataProps) {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetQuests, authToken, category ? category : null, status ? status : null] : null,
        ([_, authToken, category]) => getQuests(authToken, { 
            category: category ? QuestCategoryApiStringMatcher.match(category) : undefined,
            status: enumOrArrayOrNullToApiArray(status, QuestStatusApiStringMatcher)
        })
    )
}