import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getQuests } from "@services"
import { QuestCategory, QuestCategoryApiStringMatcher } from "@types"
import useSWR from "swr"

export type UseQuestsDataProps = [category?: QuestCategory | null | undefined]

export function useQuestsData (...[category]: UseQuestsDataProps) {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetQuests, authToken, category ? category : null] : null,
        ([_, authToken, category]) => getQuests(authToken, { category: category ? QuestCategoryApiStringMatcher.match(category) : undefined })
    )
}