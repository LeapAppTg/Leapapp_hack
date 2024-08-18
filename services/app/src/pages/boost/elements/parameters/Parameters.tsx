import { FC } from "react";
import { Parameter } from "../../components";
import { ApiRoutes, useData } from "@hooks";

export const Parameters: FC = () => {

    const { data, mutate } = useData(ApiRoutes.GetMarketItemsList)
    const upgradeCallback = (uuid: number) => {
        if (!data) return
        mutate(data.map(n => n.uuid === uuid ? { ...n, level: n.level + 1 } : n))
    }

    if (!data) return null

    return data.map(i => <Parameter {...i} upgradeCallback={() => upgradeCallback(i.uuid)} key={i.uuid}/>)
}