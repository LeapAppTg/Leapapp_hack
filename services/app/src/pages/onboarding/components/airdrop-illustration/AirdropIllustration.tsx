import { AirdropOnboarding } from "@assets";
import { FlexGapRowFullWidthFullHeight } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

export const AirdropIllustration: FC = () => {
    return (
        <div className={FlexGapRowFullWidthFullHeight.withExtraClasses(styles.wrapper)}>
            <AirdropOnboarding/>
        </div>
    )
}