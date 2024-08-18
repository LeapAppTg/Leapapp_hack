import { ReferralsOnboarding } from "@assets";
import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { AlignItems, FlexGapRowFullWidthFullHeight } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

export const InviteIllustration: FC = () => {
    return (
        <div className={FlexGapRowFullWidthFullHeight.update({ alignItems: AlignItems.FlexEnd, relativePosition: true }).className}>
            <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg}/>
            <ReferralsOnboarding className={styles.illustration}/>
        </div>
    )
}