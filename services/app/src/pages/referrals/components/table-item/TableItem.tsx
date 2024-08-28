import { Coin } from "@assets";
import { IconBox, IconColor, IconSize, UserProfileIcon } from "@icons";
import { Referral } from "@types";
import { FlexGapColumn4AlignFlexStart, FlexGapRow4, FlexGapRow8FullWidthJustifySpaceBetween, TextXSMedium, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";

export const TableItem: FC<Referral> = ({
    points, referrals, firstName, lastName
}) => {

    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className}>
            <div className={FlexGapColumn4AlignFlexStart.update({ hideOverflow: true }).className}>
                <p className={TextXSMedium.update({ cropText: true }).className}>
                    {firstName} {lastName}
                </p>
                <div className={FlexGapRow4.className}>
                    <IconBox icon={UserProfileIcon} size={IconSize.Medium} color={IconColor.Grey400}/>
                    <p className={TextXSRegularGrey400.className}>+ {referrals.format()}</p>
                </div>
            </div>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegular.update({ noLineBreak: true }).className}>+ {points.format()}</p>
                <Coin width={20} height={20}/>
            </div>
        </div>
    )
}