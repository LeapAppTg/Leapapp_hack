import { MapPathCorner, TriadSpaceBackground } from "@assets";
import { MapItem } from "@components";
import { FlexGapRowFullWidthJustifyFlexStart } from "@utils";
import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const QuestIllustration: FC<PropsWithChildren> = () => {
    return (
        <div className={styles.illustration}>
            <div className={FlexGapRowFullWidthJustifyFlexStart.className}>
                <MapItem subtitle="Social" reward={150}/>
                <MapPathCorner className={styles.path_left}/>
            </div>
            <div>
                <MapItem subtitle="Social" reward={150}/>
                <MapPathCorner className={styles.path_left}/>
            </div>
            <TriadSpaceBackground className={styles.background}/>
        </div>
    )
}