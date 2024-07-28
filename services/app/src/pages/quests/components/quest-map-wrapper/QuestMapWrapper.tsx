import { MapPathCorner, MapPathVertical } from "@assets";
import { QuestInfo } from "@types";
import { FlexGapRowFullWidthJustifyFlexEnd, FlexGapRowFullWidthJustifyFlexStart } from "@utils";
import { FC } from "react";
import { QuestItem } from "..";
import styles from "./styles.module.css";

type QuestMapWrapperProps = {
    index: number,
    questsLength: number,
    quest: QuestInfo
}

export const QuestMapWrapper: FC<QuestMapWrapperProps> = ({
    index, quest, questsLength
}) => {
    const pos = (index + 1) % 6
    const isLast = index === questsLength - 1

    return (
        <div className={(pos === 1 || pos === 4) ? FlexGapRowFullWidthJustifyFlexStart.className : (pos === 2 || pos === 5) ? undefined : FlexGapRowFullWidthJustifyFlexEnd.className}>
            <QuestItem {...quest}/>
            {
                pos === 1 || pos === 4
                ?
                <MapPathCorner className={styles.path_left}/>
                :
                pos === 3 || pos === 6
                ?
                <MapPathCorner className={styles.path_right}/>
                :
                isLast
                ?
                <MapPathVertical className={styles.path_top}/>
                :
                pos === 2
                ?
                <MapPathCorner className={styles.path_left}/>
                :
                <MapPathCorner className={styles.path_right}/>
            }
        </div>
    )
}