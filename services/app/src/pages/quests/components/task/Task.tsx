import { GoldCoin, HeroThugCoin } from "@assets";
import { TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ArrowIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { QuestTask, TaskCompletionStatus, TaskType } from "@types";
import { FlexGapColumn4AlignFlexStart, FlexGapRow12, FlexGapRow4, FlexGapRow8, FlexGapRow8FullWidthJustifySpaceBetween, TextAlign, TextXSMedium, TextXXSRegular, TextXXSRegularGrey400, classJoiner } from "@utils";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useTelegram } from "@providers";

type TaskProps = QuestTask

export const Task: FC<TaskProps> = ({
    description, link, completionStatus, name, type
}) => {

    const { openLink } = useTelegram()

    async function onClick () {
        if (type === TaskType.Link) {
            
            openLink(link)
        }
    }

    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className}>
            <div className={classJoiner(FlexGapRow12.update({ hideOverflow: true }).className, completionStatus === TaskCompletionStatus.Completed ? styles.half_opacity : undefined)}>
                <div className={styles.icon}>
                    <PointsIcon size={IconSize.Large}/>
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
                <Link to={link} target="_blank">
                    <IconBox size={IconSize.MediumBig} icon={ArrowIcon}/>
                </Link>
                :
                <div/>
                :
                null
            }

        </div>
    )
}

type RewardTaskProps = {
    pointsReward: number,
    gameTicketsReward: number
}

export const RewardTask: FC<RewardTaskProps> = ({
    gameTicketsReward, pointsReward
}) => {

    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className}>
            <div className={classJoiner(FlexGapRow12.update({ hideOverflow: true }).className)}>
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
        </div>
    )
}