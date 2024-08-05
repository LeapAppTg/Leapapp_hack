import { HeroThugCoin } from "@assets";
import { IconBox, IconColor, IconSize, UserProfileIcon } from "@icons";
import { Referral } from "@types";
import { FlexGapColumn4AlignFlexStart, FlexGapRow4, FlexGapRow8FullWidthJustifySpaceBetween, TextXSMedium, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";

export const TableItem: FC<Referral> = ({
    points, referrals, username
}) => {

    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className}>
            <div className={FlexGapColumn4AlignFlexStart.className}>
                <p className={TextXSMedium.className}>
                    @{username}
                </p>
                <div className={FlexGapRow4.className}>
                    <IconBox icon={UserProfileIcon} size={IconSize.Medium} color={IconColor.Grey400}/>
                    <p className={TextXSRegularGrey400.className}>+ {referrals.format()}</p>
                </div>
            </div>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegular.className}>+ {points.format()}</p>
                <HeroThugCoin width={20} height={20}/>
            </div>
        </div>
    )
}