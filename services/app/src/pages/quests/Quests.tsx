import { PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { ApiRoutes, useData, usePagination } from "@hooks";
import { FlexGapRow8FullWidth, TextXSMedium, TextXSRegular, classJoiner } from "@utils";
import { FC, useCallback, useState } from "react";
import { QuestItem } from "./components";
import styles from "./styles.module.css";
import { GoldStar, HeroGood } from "@assets";
import { QuestCategory, QuestStatus } from "@types";

export const QuestsPage: FC = () => {

    const [isLeapTasks, setIsLeapTasks] = useState<boolean>(true)
    const { setSize, isValidating, data: quests, mutate } = useData(ApiRoutes.GetQuests, isLeapTasks ? QuestCategory.Leap : QuestCategory.Partnership, [QuestStatus.InProgress, QuestStatus.Completed])

    const onClaim = useCallback((id: string) => {
        mutate(prev => prev ? prev.map(list => list.array.some(i => i.id === id) ? { next: list.next, array: list.array.map(i => i.id === id ? { ...i, status: QuestStatus.Claimed } : i) } : list) : undefined)
    }, [mutate])

    const ref = usePagination(setSize, isValidating, quests ? !quests[quests.length - 1].next : false)

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

        <div className={styles.quests} ref={ref}>
            {
                quests
                ?
                quests.length && quests[0].array.length
                ?
                quests.flatMap(q => q.array).map(q => <QuestItem {...q} onClaim={() => onClaim(q.id)} key={q.id}/>)
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