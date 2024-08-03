import { ApiRoutes, useData, usePagination } from "@hooks";
import { FlexGapColumn16FullWidth, FlexGapRow4, TextSMedium, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";
import { TableItem } from "../../components";
import styles from "./styles.module.css";

export const Table: FC = () => {

    const { data: referralsList, setSize, isValidating } = useData(ApiRoutes.GetReferralsList)
    const { data: referralsCount } = useData(ApiRoutes.GetReferralsCount)
    const tableRef = usePagination(setSize, isValidating, referralsList !== undefined && !referralsList[referralsList.length - 1].next)

    return (
        <div className={FlexGapColumn16FullWidth.className}>
            <div className={styles.table_title}>
                <p className={TextSMedium.className}>Referrals</p>
                <div className={FlexGapRow4.className}>
                    <p className={TextXSRegularGrey400.className}>Total:</p>
                    <p className={TextXSRegular.className}>
                        {referralsCount ? referralsCount.count.format() : '0'}
                    </p>
                </div>
            </div>
            {
                referralsList && referralsList[0].referrals.length
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