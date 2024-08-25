import { PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { FlexGapRow8FullWidth, TextXSMedium, TextXSRegular, classJoiner } from "@utils";
import { FC, useCallback, useState } from "react";
import { QuestItem } from "./components";
import styles from "./styles.module.css";
import { GoldStar, HeroGood } from "@assets";
import { QuestCategory } from "@types";

export const QuestsPage: FC = () => {

    const [isLeapTasks, setIsLeapTasks] = useState<boolean>(true)
    const { data: quests, mutate } = useData(ApiRoutes.GetQuests, isLeapTasks ? QuestCategory.Leap : QuestCategory.Partnership)

    const onClaim = useCallback((uuid: number) => {
        mutate(prev => prev ? prev.map(i => i.uuid === uuid ? { ...i, isClaimed: true } : i) : undefined)
    }, [mutate])

    return (
        <>
        <PageTitle icon={TelegramEmojiType.Folder} color={PageTitleBackgroundColor.Yellow} title="Tasks hub" subtitle="Earn more by completing tasks"/>

        <div className={styles.switcher}>
            <div className={classJoiner(styles.switch, isLeapTasks ? undefined : styles.right)}/>
            <div className={FlexGapRow8FullWidth.className} onClick={() => setIsLeapTasks(true)}>
                <HeroGood width={20} height={20}/>
                <p className={TextXSRegular.className}>
                    Leap tasks
                </p>
            </div>
            <div className={FlexGapRow8FullWidth.className} onClick={() => setIsLeapTasks(false)}>
                <GoldStar width={20} height={20}/>
                <p className={TextXSRegular.className}>
                    Partners
                </p>
            </div>
        </div>

        <div className={styles.quests}>
            {
                quests
                ?
                quests.length
                ?
                quests.map(q => <QuestItem {...q} onClaim={() => onClaim(q.uuid)} key={q.uuid}/>)
                :
                <p className={TextXSMedium.className}>
                    You've done all the tasks. Stay tuned for updates!
                </p>
                :
                null
            }
        </div>
        </>
    )
}