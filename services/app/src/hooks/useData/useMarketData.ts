import { ApiRoutes } from "@hooks"
import { useAuth } from "@providers"
import { getMarketItemsList } from "@services"
import useSWR from "swr"

export function useMarketItemsListData () {
    const { authToken } = useAuth()
    return useSWR(
        authToken ? [ApiRoutes.GetMarketItemsList, authToken] : null,
        ([_, authToken]) => getMarketItemsList(authToken)
    )
}