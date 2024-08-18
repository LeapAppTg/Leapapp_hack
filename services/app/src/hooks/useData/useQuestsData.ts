import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getQuestDetails, getQuestsList } from "@services"
import useSWR from "swr"

export function useQuestsListData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetQuestsList, authToken] : null,
        ([_, authToken]) => getQuestsList(authToken)
    )
}

export type UseQuestDetailsProps = [id: number]

export function useQuestDetailsData (...[id]: UseQuestDetailsProps) {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetQuestDetails, authToken, id] : null,
        ([_, authToken, id]) => getQuestDetails(authToken, id)
    )
}