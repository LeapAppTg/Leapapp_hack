import { DotsBackground, MapPathCorner, MapPathVertical } from "@assets";
import { ContentBlock, ContentBlockGap, MapItem, PageTitle, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { IconBox, IconSize, PointsIcon } from "@icons";
import { FlexGapColumn8, FlexGapRow4, FlexGapRowFullWidthJustifyFlexEnd, FlexGapRowFullWidthJustifyFlexStart, TextMSemiBold, TextSSemiBold, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

export const QuestsPage: FC = () => {

    return (
        <>
        <PageTitle icon={TelegramEmojiType.Gamepad} color={PageTitleBackgroundColor.Yellow} title="Quests" subtitle="Complete quests and get rewards"/>
        <ContentBlock gap={ContentBlockGap.Gap12}>
            <p className={TextSSemiBold.className}>Points left to earn in the season</p>
            <div className={FlexGapRow4.className}>
                <IconBox icon={PointsIcon} size={IconSize.Medium}/>
                <p className={TextXSRegular.className}>{Number(109102).format()}</p>
            </div>
        </ContentBlock>
        <div className={FlexGapColumn8.className}>
            <h3 className={TextMSemiBold.className}>Season #1 - ends in 3 days</h3>
            <p className={TextXSRegularGrey400.className}>This is where the fun begins</p>
        </div>
        <div className={styles.quests}>
            <div className={styles.dots_background_repeat}>
                <DotsBackground/>
                <DotsBackground/>
            </div>
            <div className={FlexGapRowFullWidthJustifyFlexStart.className}>
                <MapItem subtitle="Social" reward={150}/>
                <MapPathCorner className={styles.path_left}/>
            </div>
            <div>
                <MapItem subtitle="Social" reward={150}/>
                <MapPathCorner className={styles.path_left}/>
            </div>
            <div className={FlexGapRowFullWidthJustifyFlexEnd.className}>
                <MapItem subtitle="Social" reward={150}/>
                <MapPathCorner className={styles.path_right}/>
            </div>
            <div>
                <MapItem subtitle="Social" reward={150}/>
                <MapPathCorner className={styles.path_right}/>
            </div>
            <div className={FlexGapRowFullWidthJustifyFlexStart.className}>
                <MapItem subtitle="Social" reward={150}/>
                <MapPathCorner className={styles.path_left}/>
            </div>
            <div>
                <MapItem subtitle="Social" reward={150}/>
                <MapPathVertical className={styles.path_top}/>
            </div>
            <TelegramEmoji type={TelegramEmojiType.FinishFlag} size={TelegramEmojiSize.Medium}/>
        </div>
        </>
    )
}