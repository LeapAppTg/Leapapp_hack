import { DotsBackground, MapPathCorner, MapPathVertical } from "@assets";
import { MapItem, PageTitle, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { FlexGapColumn8FullWidth, FlexGapRowFullWidthJustifyFlexEnd, FlexGapRowFullWidthJustifyFlexStart, TextXSBold, TextXXSRegularGrey400 } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";
import { QuestInfo } from "@types";
import { QuestMapWrapper } from "./components";

export const QuestsPage: FC = () => {

    const { data: quests } = useData(ApiRoutes.GetQuestsList)

    return (
        <>
        <PageTitle icon={TelegramEmojiType.Gamepad} color={PageTitleBackgroundColor.Yellow} title="Quests"/>
        <div className={FlexGapColumn8FullWidth.className}>
            <p className={TextXSBold.className}>
                Season #1
            </p>
            <p className={TextXXSRegularGrey400.className}>
                This is where the fun begins!
            </p>
        </div>
        <div className={styles.quests}>
            <div className={styles.dots_background_repeat}>
                <div>
                    <DotsBackground/>
                    <DotsBackground/>
                </div>
            </div>
            {
                quests
                ?
                quests.quests.map((q, i) => <QuestMapWrapper quest={q} index={i} questsLength={quests.quests.length}/>)
                :
                null
            }
            <TelegramEmoji type={TelegramEmojiType.FinishFlag} size={TelegramEmojiSize.Medium}/>
        </div>
        </>
    )
}

type QuestProps = {
    index: number,
    questsLength: number,
    quest: QuestInfo
}

const Quest: FC<QuestProps> = ({
    index, quest, questsLength
}) => {
    const pos = (index + 1) % 6
    const isLast = index === questsLength - 1

    return (
        <div className={(pos === 1 || pos === 4) ? FlexGapRowFullWidthJustifyFlexStart.className : (pos === 2 || pos === 5) ? undefined : FlexGapRowFullWidthJustifyFlexEnd.className}>
            <MapItem subtitle="Social" reward={150}/>
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