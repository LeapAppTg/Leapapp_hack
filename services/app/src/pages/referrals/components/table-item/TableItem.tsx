import { IconBox, IconColor, IconSize, PointsIcon, UserProfileIcon } from "@icons";
import { FlexGapColumn4AlignFlexStart, FlexGapRow4, FlexGapRow8FullWidthJustifySpaceBetween, TextXSMedium, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";

export const TableItem: FC = () => {

    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className}>
            <div className={FlexGapColumn4AlignFlexStart.className}>
                <p className={TextXSMedium.className}>@VI****ch</p>
                <div className={FlexGapRow4.className}>
                    <IconBox icon={UserProfileIcon} size={IconSize.Medium} color={IconColor.Grey400}/>
                    <p className={TextXSRegularGrey400.className}>+8</p>
                </div>
            </div>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegular.className}>+ 52 990</p>
                <IconBox icon={PointsIcon} size={IconSize.Medium}/>
            </div>
        </div>
    )
}