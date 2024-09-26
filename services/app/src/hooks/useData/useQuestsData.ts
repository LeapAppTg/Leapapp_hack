import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getQuests } from "@services"
import { QueryMultiple, Quest, QuestCategory, QuestCategoryApiStringMatcher, QuestStatus, QuestStatusApiStringMatcher } from "@types"
import { TypeOrArrayOrNullOrUndefined, enumOrArrayOrNullToApiArray } from "@utils"
import useSWRInfinite from "swr/infinite"

export type UseQuestsDataProps = [category?: QuestCategory | null | undefined, status?: TypeOrArrayOrNullOrUndefined<QuestStatus>]

export function useQuestsData (...[category, status]: UseQuestsDataProps) {
    const { authToken } = useAuth()
    return useSWRInfinite(
        (pageIndex, prevData: QueryMultiple<Quest>) => {
            if (!authToken) return null
            if (prevData && !prevData.next) return null
            return [ApiRoutes.GetQuests, authToken, category ? category : null, status ? status : null, pageIndex]
        },
        ([_, authToken, category, status, pageIndex]) => getQuests(authToken, { 
            category: category ? QuestCategoryApiStringMatcher.match(category) : undefined,
            status: enumOrArrayOrNullToApiArray(status, QuestStatusApiStringMatcher),
            limit: '20',
            offset: (20 * pageIndex).toString()
        })
    )
}