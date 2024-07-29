import { HeroGood } from "@assets";
import { AlertStatus, Button, ButtonStyle, ContentBlock, PageTitle, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { FlexGapColumn12FullWidth, FlexGapColumn16FullWidth, FlexGapRow4, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";
import { RewardTask, Task } from "../../components";
import styles from "./styles.module.css";
import { QuestCompletionStatus } from "@types";
import { useAlerts, useAuth, useBottomPopup } from "@providers";
import { postClaimQuest } from "@services";

type QuestDetailsProps = {
    uuid: number
}

export const QuestDetails: FC<QuestDetailsProps> = ({ uuid }) => {

    const { data: details } = useData(ApiRoutes.GetQuestDetails, uuid)
    const { mutate } = useData(ApiRoutes.GetQuestsList)
    const { sendAlert, sendApiErrorAlert } = useAlerts()
    const { authToken } = useAuth()
    const { hidePopup } = useBottomPopup()

    async function onClaim () {
        if (!details) return
        try {
            await postClaimQuest(authToken, details.quest.uuid)
            let message: string = 'Claimed'
            if (details.quest.rewardPoints) message += ` +${details.quest.rewardPoints.format(undefined, 2)} points`
            if (details.quest.rewardGameTickets) message += ` +${details.quest.rewardGameTickets.format()} tickets`
            if (!details.quest.rewardPoints && !details.quest.rewardGameTickets) message += ` reward successfully`
            sendAlert({ status: AlertStatus.Success, withConfetti: true, message })
            hidePopup()
            mutate()
        } catch (e) {
            sendApiErrorAlert(e)
        }
    }

    if (!details) return null

    return (
        <>
        <PageTitle color={PageTitleBackgroundColor.Yellow} title={details.quest.name} subtitle="Complete quest and get reward"/>
        <div className={styles.tasks}>
            {
                details.tasks.map(t => <Task {...t} questUuid={details.quest.uuid} key={t.uuid}/>)
            }
            <RewardTask gameTicketsReward={details.quest.rewardGameTickets} pointsReward={details.quest.rewardPoints} completionStatus={details.quest.completionStatus}/>
        </div>
        {
            details.quest.completionStatus !== QuestCompletionStatus.Claimed
            ?
            <div className={FlexGapColumn16FullWidth.className}>
                <p className={TextXSRegularGrey400.className}>Complete the quests to get reward</p>
                <Button style={ButtonStyle.Primary} fillFullWidth disabled={details.quest.completionStatus !== QuestCompletionStatus.Completed} onClick={onClaim}>
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
            </div>
            :
            null
        }
        </>
    )
}