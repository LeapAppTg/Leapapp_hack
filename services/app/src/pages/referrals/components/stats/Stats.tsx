import { ApiRoutes, useData } from "@hooks";
import { FlexGapRow24, FlexGapRow4, TextSSemiBold, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";

export const Stats: FC = () => {

    const { data: referralsCount } = useData(ApiRoutes.GetReferralsCount)
    
    return (
        <div className={FlexGapRow24.className}>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegularGrey400.className}>
                    Invited:
                </p>
                <p className={TextSSemiBold.className}>
                    {referralsCount?.count.format() || '-'}
                </p>
            </div>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegularGrey400.className}>
                    Claimed:
                </p>
                <p className={TextSSemiBold.className}>
                    2 113
                </p>
            </div>
        </div>
    )
}