import { Discord, Facebook, GoldCoin, HeroGood, HeroThugCoin, Instagram, Telegram, Threads, TicketEmoji, X, Youtube } from "@assets";
import { CircleIconWrapper, CircleIconWrapperColor } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { ArrowIcon, CheckmarkIcon, IconBox, IconSize } from "@icons";
import { useAlerts, useAuth, useTelegram } from "@providers";
import { postClaimTask } from "@services";
import { QuestCompletionStatus, QuestTask, TaskCompletionStatus, TaskType } from "@types";
import { FlexGapColumn4AlignFlexStart, FlexGapRow12, FlexGapRow12FullWidth, FlexGapRow4, FlexGapRow8, FlexGapRow8FullWidthJustifySpaceBetween, JustifyContent, TextAlign, TextXSMedium, TextXXSRegular, TextXXSRegularGrey400, classJoiner } from "@utils";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

type TaskProps = QuestTask & { questUuid: number }

export const Task: FC<TaskProps> = ({
    uuid, description, link, completionStatus, name, type, questUuid
}) => {

    const { openLink, openTelegramLink, shareLink } = useTelegram()
    const { sendApiErrorAlert } = useAlerts()
    const { authToken } = useAuth()
    const navigate = useNavigate()
    const { data: inviteLink } = useData(ApiRoutes.GetInviteLink)

    async function onClick () {
        if (completionStatus === TaskCompletionStatus.Completed) return
        if ((type === TaskType.Link || type === TaskType.X || type === TaskType.Telegram) && link) {
            try {
                await postClaimTask(authToken, questUuid, uuid)
                if (type === TaskType.Telegram) openTelegramLink(link)
                openLink(link)
            } catch (e) {
                sendApiErrorAlert(e)
            }
        }
        if (type === TaskType.Invite) {
            if (inviteLink) shareLink(inviteLink.inviteLink)
            else navigate('/referrals')
        }
    }

    return (
        <div className={FlexGapRow12FullWidth.update({ justifyContent: JustifyContent.SpaceBetween }).className} onClick={onClick}>
            <div className={FlexGapRow12FullWidth.update({ hideOverflow: true }).withExtraClasses(completionStatus === TaskCompletionStatus.Completed ? styles.half_opacity : undefined)}>
                <div className={styles.icon}>
                    <TaskIcon type={type}/>
                </div>
                <div className={FlexGapColumn4AlignFlexStart.update({ hideOverflow: true, fillFullWidth: true }).className}>
                    <p className={TextXSMedium.className}>{name}</p>
                    {
                        false
                        ?
                        <div className={FlexGapRow12FullWidth.className}>
                            <div className={styles.progress_wrapper}>
                                <div style={{ width: `${90}%` }}/>
                            </div>
                            <p className={TextXXSRegular.className}>
                                2/5
                            </p>
                        </div>
                        :
                        description
                        ?
                        <p className={TextXXSRegularGrey400.update({ textAlign: TextAlign.Left, cropText: true }).className}>{description}</p>
                        :
                        null
                    }
                </div>
            </div>
            {
                completionStatus === TaskCompletionStatus.Completed
                ?
                <CircleIconWrapper color={CircleIconWrapperColor.Green600} icon={CheckmarkIcon}/>
                :
                type === TaskType.Game || type === TaskType.Points || type === TaskType.Days
                ?
                <div/>
                :
                <IconBox size={IconSize.MediumBig} icon={ArrowIcon}/>
            }
        </div>
    )
}

type TaskIconProps = {
    type: TaskType
}

const TaskIcon: FC<TaskIconProps> = ({ type }) => {
    if (type === TaskType.Telegram) return <Telegram width={28} height={28}/>
    if (type === TaskType.X) return <X width={28} height={28}/>
    if (type === TaskType.Youtube) return <Youtube width={28} height={28}/>
    if (type === TaskType.Instagram) return <Instagram width={28} height={28}/>
    if (type === TaskType.Discord) return <Discord width={28} height={28}/>
    if (type === TaskType.Facebook) return <Facebook width={28} height={28}/>
    if (type === TaskType.Threads) return <Threads width={28} height={28}/>
    return <HeroGood width={28} height={28}/>
}

type RewardTaskProps = {
    pointsReward: number,
    gameTicketsReward: number,
    completionStatus: QuestCompletionStatus
}

export const RewardTask: FC<RewardTaskProps> = ({
    gameTicketsReward, pointsReward, completionStatus
}) => {

    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className}>
            <div className={classJoiner(FlexGapRow12.update({ hideOverflow: true }).className, completionStatus === QuestCompletionStatus.Claimed ? styles.half_opacity : undefined)}>
                <div className={styles.icon}>
                    <GoldCoin width={28} height={28}/>
                </div>
                <div className={FlexGapColumn4AlignFlexStart.update({ hideOverflow: true }).className}>
                    <p className={TextXSMedium.className}>Get reward</p>
                    <div className={FlexGapRow8.className}>
                        {
                            pointsReward
                            ?
                            <div className={FlexGapRow4.className}>
                                <p className={TextXXSRegular.className}>+{pointsReward.format("default", 2)}</p>
                                <HeroThugCoin width={20} height={20}/>
                            </div>
                            :
                            null
                        }
                        {
                            gameTicketsReward
                            ?
                            <div className={FlexGapRow4.className}>
                                <p className={TextXXSRegular.className}>+{gameTicketsReward.format("default", 2)}</p>
                                <TicketEmoji width={20} height={20}/>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            </div>
            {
                completionStatus === QuestCompletionStatus.Claimed
                ?
                <CircleIconWrapper color={CircleIconWrapperColor.Green600} icon={CheckmarkIcon}/>
                :
                null
            }
        </div>
    )
}