import { FC } from "react";
import { Parameter } from "../../components";
import { ApiRoutes, useData } from "@hooks";
import { ComingSoon } from "@components";

export const Parameters: FC = () => {

    const { data, mutate } = useData(ApiRoutes.GetMarketItemsList)
    const upgradeCallback = (uuid: number) => {
        if (!data) return
        mutate(data.map(n => n.uuid === uuid ? { ...n, level: n.level + 1 } : n))
    }

    if (!data) return null
    
    if (data.length === 0) return <ComingSoon subtitle="We are improving boosts"/>

    return data.sort((a, b) => a.uuid - b.uuid).map(i => <Parameter {...i} upgradeCallback={() => upgradeCallback(i.uuid)} key={i.uuid}/>)
}