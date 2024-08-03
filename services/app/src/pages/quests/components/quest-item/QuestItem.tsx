import { HeroThugCoin } from "@assets";
import { CircleIconWrapper, CircleIconWrapperColor } from "@components";
import { ArrowIcon, CheckmarkIcon, IconBox, IconColor, IconSize, QuestionCircleIcon, SecurityLockIcon, StarsLightSparkleIcon } from "@icons";
import { useBottomPopup } from "@providers";
import { QuestCompletionStatus, QuestInfo, QuestStatus } from "@types";
import { AlignItems, FlexGapColumn4, FlexGapColumn4AlignFlexStart, FlexGapRow16FullWidth, FlexGapRow4, FlexGapRow4FullWidth, JustifyContent, TextColor, TextXSMedium, TextXSRegular, TextXSRegularGrey400, classJoiner } from "@utils";
import { FC } from "react";
import { QuestDetails } from "../../elements";
import styles from "./styles.module.css";

type QuestItemProps = QuestInfo

export const QuestItem: FC<QuestItemProps> = ({
    uuid, name, rewardPoints, completionStatus, status
}) => {

    const { popup, showPopup } = useBottomPopup()
    const onClick = () => {
        if (status === QuestStatus.Locked || popup) return
        showPopup(<QuestDetails uuid={uuid}/>)
    }


    return (
        <div className={classJoiner(
            FlexGapRow16FullWidth.update({ justifyContent: JustifyContent.SpaceBetween }).className, styles.task,
            status === QuestStatus.Locked || completionStatus === QuestCompletionStatus.Claimed ? styles.half_opacity : undefined
        )} onClick={onClick}>
            <div className={styles.icon_wrapper}>
                <IconBox icon={StarsLightSparkleIcon} size={IconSize.MediumBig}/>
                <svg className={styles.border} xmlns="http://www.w3.org/2000/svg" width="54" height="60" viewBox="0 0 54 60">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M51.0811 42.5242V17.4758C51.0811 16.4116 50.5017 15.4318 49.5691 14.9188L28.4069 3.27969C27.5309 2.79788 26.4691 2.79788 25.5931 3.27969L4.43094 14.9188C3.49833 15.4318 2.91892 16.4116 2.91892 17.4758V42.5242C2.91892 43.5884 3.49833 44.5682 4.43094 45.0812L25.5931 56.7203C26.4691 57.2021 27.5309 57.2021 28.4069 56.7203L49.5691 45.0812C50.5017 44.5682 51.0811 43.5884 51.0811 42.5242ZM3.02405 12.3619C1.15882 13.3877 0 15.3474 0 17.4758V42.5242C0 44.6526 1.15881 46.6123 3.02405 47.6381L24.1862 59.2773C25.9383 60.2409 28.0617 60.2409 29.8138 59.2773L50.976 47.6381C52.8412 46.6123 54 44.6526 54 42.5242V17.4758C54 15.3474 52.8412 13.3877 50.976 12.3619L29.8138 0.722721C28.0617 -0.240906 25.9383 -0.240908 24.1862 0.722719L3.02405 12.3619Z"/>
                </svg>
                <svg className={styles.background} xmlns="http://www.w3.org/2000/svg" width="44" height="50" viewBox="0 0 44 50">
                    <path d="M0.109375 14.6384C0.109375 13.0419 0.978628 11.5721 2.37773 10.8027L19.8912 1.17223C21.2051 0.449749 22.7974 0.44975 24.1113 1.17224L41.6248 10.8027C43.0239 11.5721 43.8932 13.0419 43.8932 14.6384V35.362C43.8932 36.9584 43.0239 38.4282 41.6248 39.1976L24.1113 48.8281C22.7974 49.5506 21.2051 49.5506 19.8912 48.8281L2.37773 39.1976C0.978626 38.4282 0.109375 36.9584 0.109375 35.362V14.6384Z"/>
                </svg>
            </div>
            <div className={FlexGapColumn4AlignFlexStart.update({ fillFullWidth: true }).className}>
                <p className={TextXSMedium.className}>{name}</p>
                <div className={FlexGapRow4.className}>
                    <HeroThugCoin width={20} height={20}/>
                    <p className={TextXSRegular.className}>{rewardPoints.format()}</p>
                </div>
            </div>
            {
                completionStatus === QuestCompletionStatus.Claimed
                ?
                <CircleIconWrapper color={CircleIconWrapperColor.Green600} icon={CheckmarkIcon}/>
                :
                status === QuestStatus.Active
                ?
                <IconBox icon={ArrowIcon} size={IconSize.MediumBig}/>
                :
                status === QuestStatus.Locked || status === QuestStatus.Finished
                ?
                <CircleIconWrapper color={CircleIconWrapperColor.Grey700} icon={SecurityLockIcon}/>
                :
                null
            }
        </div>
    )
}


export const HiddenQuestItem: FC = () => {
    return (
        <div className={FlexGapRow16FullWidth.update({ justifyContent: JustifyContent.SpaceBetween }).withExtraClasses(styles.hidden, styles.task)}>
            <div className={styles.icon_wrapper}>
                <IconBox icon={QuestionCircleIcon} size={IconSize.MediumBig} color={IconColor.Grey500}/>
                <svg className={styles.border} xmlns="http://www.w3.org/2000/svg" width="54" height="60" viewBox="0 0 54 60">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M51.0811 42.5242V17.4758C51.0811 16.4116 50.5017 15.4318 49.5691 14.9188L28.4069 3.27969C27.5309 2.79788 26.4691 2.79788 25.5931 3.27969L4.43094 14.9188C3.49833 15.4318 2.91892 16.4116 2.91892 17.4758V42.5242C2.91892 43.5884 3.49833 44.5682 4.43094 45.0812L25.5931 56.7203C26.4691 57.2021 27.5309 57.2021 28.4069 56.7203L49.5691 45.0812C50.5017 44.5682 51.0811 43.5884 51.0811 42.5242ZM3.02405 12.3619C1.15882 13.3877 0 15.3474 0 17.4758V42.5242C0 44.6526 1.15881 46.6123 3.02405 47.6381L24.1862 59.2773C25.9383 60.2409 28.0617 60.2409 29.8138 59.2773L50.976 47.6381C52.8412 46.6123 54 44.6526 54 42.5242V17.4758C54 15.3474 52.8412 13.3877 50.976 12.3619L29.8138 0.722721C28.0617 -0.240906 25.9383 -0.240908 24.1862 0.722719L3.02405 12.3619Z"/>
                </svg>
                <svg className={styles.background} xmlns="http://www.w3.org/2000/svg" width="44" height="50" viewBox="0 0 44 50">
                    <path d="M0.109375 14.6384C0.109375 13.0419 0.978628 11.5721 2.37773 10.8027L19.8912 1.17223C21.2051 0.449749 22.7974 0.44975 24.1113 1.17224L41.6248 10.8027C43.0239 11.5721 43.8932 13.0419 43.8932 14.6384V35.362C43.8932 36.9584 43.0239 38.4282 41.6248 39.1976L24.1113 48.8281C22.7974 49.5506 21.2051 49.5506 19.8912 48.8281L2.37773 39.1976C0.978626 38.4282 0.109375 36.9584 0.109375 35.362V14.6384Z"/>
                </svg>
            </div>

            <div className={FlexGapRow4FullWidth.update({ justifyContent: JustifyContent.FlexStart }).className}>
                <p className={TextXSRegularGrey400.className}>Coming soon...</p>
            </div>

            <CircleIconWrapper color={CircleIconWrapperColor.Grey700} icon={SecurityLockIcon}/>
        </div>
    )
}