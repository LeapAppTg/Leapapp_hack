import { MapPathCorner, MapPathVertical } from "@assets";
import { QuestInfo } from "@types";
import { FlexGapRowFullWidth, FlexGapRowFullWidthJustifyFlexEnd, FlexGapRowFullWidthJustifyFlexStart } from "@utils";
import { FC } from "react";
import { HiddenQuestItem, QuestItem } from "..";
import styles from "./styles.module.css";

type QuestMapWrapperProps = {
    index: number,
    questsLength: number,
    quest: QuestInfo
}

export const QuestMapWrapper: FC<QuestMapWrapperProps> = ({
    index, quest, questsLength
}) => {
    const pos = 1 + index % 4
    const isLast = index === questsLength - 1

    return (
        <div className={pos === 1 ? FlexGapRowFullWidthJustifyFlexStart.className : (pos === 2 || pos === 4) ? FlexGapRowFullWidth.className : FlexGapRowFullWidthJustifyFlexEnd.className}>
            <QuestItem {...quest}/>
            {
                isLast
                ?
                <MapPathVertical className={styles.path_top}/>
                :
                pos === 1
                ?
                <MapPathCorner className={styles.path_left}/>
                :
                pos === 3
                ?
                <MapPathCorner className={styles.path_right}/>
                :
                pos === 2
                ?
                <MapPathCorner className={styles.path_center_left}/>
                :
                <MapPathCorner className={styles.path_center_right}/>
            }
        </div>
    )
}

type HiddenQuestMapWrapperProps = {
    index: number,
    length: number
}

export const HiddenQuestMapWrapper: FC<HiddenQuestMapWrapperProps> = ({
    index, length
}) => {
    const pos = 1 + (index + 1) % 4
    const isLast = index === length - 1
    return (
        <div className={pos === 1 ? FlexGapRowFullWidthJustifyFlexStart.className : (pos === 2 || pos === 4) ? FlexGapRowFullWidth.className : FlexGapRowFullWidthJustifyFlexEnd.className}>
            <HiddenQuestItem/>
            {
                isLast
                ?
                null
                :
                pos === 1
                ?
                <MapPathCorner className={styles.path_left}/>
                :
                pos === 3
                ?
                <MapPathCorner className={styles.path_right}/>
                :
                pos === 2
                ?
                <MapPathCorner className={styles.path_center_left}/>
                :
                <MapPathCorner className={styles.path_center_right}/>
            }
        </div>
    )
}