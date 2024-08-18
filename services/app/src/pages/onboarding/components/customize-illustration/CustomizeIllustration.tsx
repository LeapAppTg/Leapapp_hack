import { CustomizationOnboarding } from "@assets";
import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FlexGapRowFullWidth, FlexGapRowFullWidthFullHeight } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

export const CustomizeIllustration: FC = () => {
    return (
        <div className={FlexGapRowFullWidthFullHeight.className}>
            <div className={FlexGapRowFullWidth.update({ relativePosition: true }).withExtraClasses(styles.bg_wrapper)}>
                <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg}/>
                <CustomizationOnboarding/>
            </div>
        </div>
    )
}