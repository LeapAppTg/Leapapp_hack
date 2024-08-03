import { FC } from "react";
import styles from "./styles.module.css";
import { ApiRoutes, useData } from "@hooks";
import { FlexGapColumn20FullWidth } from "@utils";
import { TableItem } from "../../components";

export const Table: FC = () => {
    const { data } = useData(ApiRoutes.GetGameLeaderboard)

    if (!data) return null

    return (
        <div className={FlexGapColumn20FullWidth.withExtraClasses(styles.table)}>
            {
                data.map((m, i) => <TableItem {...m} place={i + 1} key={i.toString() + m.username}/>)
            }
        </div>
    )
}