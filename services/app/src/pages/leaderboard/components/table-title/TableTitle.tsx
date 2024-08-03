import { FlexGapRowFullWidthJustifyFlexStart, TextSMedium } from "@utils";
import { FC } from "react";

export const TableTitle: FC = () => {
    return (
        <div className={FlexGapRowFullWidthJustifyFlexStart.alignItems}>
            <p className={TextSMedium.className}>
                Top 10
            </p>
        </div>
    )
}