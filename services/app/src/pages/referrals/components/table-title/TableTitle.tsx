import { ApiRoutes, useData } from "@hooks";
import { FlexGapRow4, TextSMedium, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

export const TableTitle: FC = () => {

    const { data: referralsCount } = useData(ApiRoutes.GetReferralInfo)

    return (
        <div className={styles.table_title}>
            <p className={TextSMedium.className}>Referrals</p>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegularGrey400.className}>Total:</p>
                <p className={TextXSRegular.className}>
                    {referralsCount ? referralsCount.invitedUsersCount.format() : '0'}
                </p>
            </div>
        </div>
    )
}