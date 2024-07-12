import { MapPathCorner, TilesDarkBackground } from "@assets";
import { MapItem } from "@components";
import { FlexGapRowFullWidthJustifySpaceBetween } from "@utils";
import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const LearningIllustration: FC<PropsWithChildren> = () => {
    return (
        <div className={styles.illustration}>
            <TilesDarkBackground className={styles.background}/>
            <div>
                <MapItem title="How the DEX works?"/>
                <MapPathCorner className={styles.path_left}/>
                <MapPathCorner className={styles.path_right}/>
            </div>
            <div className={FlexGapRowFullWidthJustifySpaceBetween.className}>
                <MapItem title="How the DEX works?"/>
                <MapItem title="How the DEX works?"/>
            </div>
        </div>
    )
}