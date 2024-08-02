import { PageTitle, PageTitleBackground, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { FlexGapColumn8FullWidth, FlexGapRowFullWidth, TextXSBold, TextXXSRegularGrey400 } from "@utils";
import { FC } from "react";
import { HiddenQuestItem, QuestItem } from "./components";
import styles from "./styles.module.css";

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
            {
                quests
                ?
                quests.quests.map((q, i) => <QuestItem {...q} key={q.uuid}/>)
                :
                null
            }
            <TelegramEmoji type={TelegramEmojiType.FinishFlag} size={TelegramEmojiSize.Large}/>
        </div>
        <div className={FlexGapRowFullWidth.className}>
            <svg className={FlexGapRowFullWidth.className} width="345" height="42" viewBox="0 0 345 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999997 41L13.875 21M344 41L331.125 21M13.875 21L86.75 21L172.5 21L258.25 21L331.125 21M13.875 21L0.999997 1.00002M331.125 21L344 1.00003" stroke="#505760" stroke-dasharray="8 8"/>
            </svg>
        </div>
        <div className={FlexGapColumn8FullWidth.update({ relativePosition: true }).className}>
            <PageTitleBackground color={PageTitleBackgroundColor.Green}/>
            <p className={TextXSBold.className}>
                Season #2
            </p>
            <p className={TextXXSRegularGrey400.className}>
                Coming soon!
            </p>
        </div>
        <div className={styles.quests}>
            {
                [0, 1, 2].map(i => <HiddenQuestItem key={i}/>)
            }
        </div>
        </>
    )
}