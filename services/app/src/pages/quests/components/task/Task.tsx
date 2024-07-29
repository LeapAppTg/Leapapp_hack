import { Discord, GoldCoin, HeroThugCoin, Instagram, Telegram, X } from "@assets";
import { AlertStatus, CircleIconWrapper, CircleIconWrapperColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ArrowIcon, CheckmarkIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { QuestCompletionStatus, QuestTask, TaskCompletionStatus, TaskType } from "@types";
import { FlexGapColumn4AlignFlexStart, FlexGapRow12, FlexGapRow4, FlexGapRow8, FlexGapRow8FullWidthJustifySpaceBetween, TextAlign, TextXSMedium, TextXXSRegular, TextXXSRegularGrey400, classJoiner } from "@utils";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useAlerts, useAuth, useTelegram } from "@providers";
import { ApiError } from "@builders";
import { postClaimTask } from "@services";

type TaskProps = QuestTask & { questUuid: number }

export const Task: FC<TaskProps> = ({
    uuid, description, link, completionStatus, name, type, questUuid
}) => {

    const { openLink } = useTelegram()
    const { sendApiErrorAlert } = useAlerts()
    const { authToken } = useAuth()

    async function onClick () {
        if (completionStatus === TaskCompletionStatus.Completed) return
        if (type === TaskType.Link) {
            try {
                await postClaimTask(authToken, questUuid, uuid)
                openLink(link)
            } catch (e) {
                sendApiErrorAlert(e)
            }
        }
    }

    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className} onClick={onClick}>
            <div className={classJoiner(FlexGapRow12.update({ hideOverflow: true }).className, completionStatus === TaskCompletionStatus.Completed ? styles.half_opacity : undefined)}>
                <div className={styles.icon}>
                    {
                        link
                        ?
                        <LinkIcon link={link}/>
                        :
                        <PointsIcon size={IconSize.Large}/>
                    }
                </div>
                <div className={FlexGapColumn4AlignFlexStart.update({ hideOverflow: true }).className}>
                    <p className={TextXSMedium.className}>{name}</p>
                    <p className={TextXXSRegularGrey400.update({ textAlign: TextAlign.Left, cropText: true }).className}>{description}</p>
                </div>
            </div>
            {
                completionStatus === TaskCompletionStatus.NotStarted
                ?
                link
                ?
                <IconBox size={IconSize.MediumBig} icon={ArrowIcon}/>
                :
                <div/>
                :
                <CircleIconWrapper color={CircleIconWrapperColor.Green600} icon={CheckmarkIcon}/>
            }
        </div>
    )
}

type LinkIconProps = {
    link: string
}

const LinkIcon: FC<LinkIconProps> = ({ link }) => {
    if (link.includes('t.me')) return <Telegram width={28} height={28}/>
    if (link.includes('youtube') || link.includes('youtu.be')) return <X width={28} height={28}/>
    if (link.includes('discord')) return <Discord width={28} height={28}/>
    if (link.includes('instagram')) return <Instagram width={28} height={28}/>
    if (link.includes('x.com') || link.includes('twitter')) return <X width={28} height={28}/>
    return <PointsIcon size={IconSize.Large}/>
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
                                <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Ticket}/>
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