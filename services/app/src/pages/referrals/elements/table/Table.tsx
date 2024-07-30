import { FlexGapColumn16FullWidth, FlexGapRow4, TextSMedium, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC, useEffect } from "react";
import { TableItem } from "../../components";
import styles from "./styles.module.css";
import { ApiRoutes, useData, usePagination } from "@hooks";

export const Table: FC = () => {

    const { data: referralsList, size, setSize, isValidating } = useData(ApiRoutes.GetReferralsList)
    const tableRef = usePagination(setSize, isValidating, referralsList !== undefined && referralsList[0].totalReferrals <= 1 + size * 5)

    return (
        <div className={FlexGapColumn16FullWidth.className}>
            <div className={styles.table_title}>
                <p className={TextSMedium.className}>Referrals</p>
                <div className={FlexGapRow4.className}>
                    <p className={TextXSRegularGrey400.className}>Total:</p>
                    <p className={TextXSRegular.className}>
                        {referralsList ? referralsList[0].totalReferrals.format() : '0'}
                    </p>
                </div>
            </div>
            {
                referralsList && referralsList[0].totalReferrals
                ?
                <div className={styles.table} ref={tableRef}>
                    {referralsList.flatMap(p => p.referrals).map(r => <TableItem {...r} key={r.username}/>)}
                </div>
                :
                null
            }
        </div>
    )
}