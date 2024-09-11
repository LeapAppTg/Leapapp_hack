import { ApiRoutes, useData } from "@hooks";
import { FlexGapRow24, FlexGapRow4, TextSSemiBold, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";

export const Stats: FC = () => {

    const { data: referralInfo } = useData(ApiRoutes.GetReferralInfo)
    
    return (
        <div className={FlexGapRow24.className}>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegularGrey400.className}>
                    Invited:
                </p>
                <p className={TextSSemiBold.className}>
                    {referralInfo?.invitedUsersCount.format() || '-'}
                </p>
            </div>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegularGrey400.className}>
                    Claimed:
                </p>
                <p className={TextSSemiBold.className}>
                    {referralInfo?.claimedPointsCount.format() || '-'}
                </p>
            </div>
        </div>
    )
}