import { HeroGood } from "@assets";
import { Button, ButtonStyle, ContentBlock, PageTitle, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { FlexGapRow4, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";
import { RewardTask, Task } from "../../components";
import styles from "./styles.module.css";
import { QuestCompletionStatus } from "@types";

type QuestDetailsProps = {
    uuid: number
}

export const QuestDetails: FC<QuestDetailsProps> = ({ uuid }) => {

    const { data: details } = useData(ApiRoutes.GetQuestDetails, uuid)

    if (!details) return null

    return (
        <>
        <PageTitle color={PageTitleBackgroundColor.Yellow} title={details.quest.name} subtitle="Complete quest and get reward"/>
        <div className={styles.tasks}>
            {
                details.tasks.map(t => <Task {...t} key={t.uuid}/>)
            }
            <RewardTask gameTicketsReward={details.quest.rewardGameTickets} pointsReward={details.quest.rewardPoints}/>
        </div>
        <ContentBlock>
            <p className={TextXSRegularGrey400.className}>Complete the quests to get reward</p>
            <Button style={ButtonStyle.Primary} fillFullWidth disabled={details.quest.completionStatus !== QuestCompletionStatus.Completed}>
                Get reward
                {
                    details.quest.rewardPoints
                    ?
                    <span className={FlexGapRow4.className}>
                        <HeroGood width={20} height={20}/>
                        {details.quest.rewardPoints.format("default", 2)}
                    </span>
                    :
                    null
                }
                {
                    details.quest.rewardGameTickets
                    ?
                    <span className={FlexGapRow4.className}>
                        <TelegramEmoji type={TelegramEmojiType.Ticket} size={TelegramEmojiSize.Small}/>
                        {details.quest.rewardGameTickets.format("default", 2)}
                    </span>
                    :
                    null
                }
            </Button>
        </ContentBlock>
        </>
    )
}