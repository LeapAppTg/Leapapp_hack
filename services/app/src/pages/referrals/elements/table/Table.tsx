import { ApiRoutes, useData, usePagination } from "@hooks";
import { FlexGapColumn16FullWidth } from "@utils";
import { FC } from "react";
import { NoReferrals, TableItem, TableTitle } from "../../components";
import styles from "./styles.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Table: FC = () => {

    const { data: referralsList, setSize, isValidating, isLoading } = useData(ApiRoutes.GetReferralsList)
    const tableRef = usePagination(setSize, isValidating, referralsList !== undefined && !referralsList[referralsList.length - 1].next)

    return (
        <div className={FlexGapColumn16FullWidth.className}>
            <TableTitle/>
            {
                referralsList && referralsList[0].referrals.length
                ?
                <div className={styles.table} ref={tableRef}>
                    {referralsList.flatMap(p => p.referrals).map(r => <TableItem {...r} key={r.username}/>)}
                </div>
                :
                <NoReferrals/>
            }
            {
                isValidating
                ?
                <div className={styles.loader}>
                    <div/><div/><div/>
                </div>
                :
                null
            }
        </div>
    )
}