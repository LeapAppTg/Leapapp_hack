import { Coin } from "@assets";
import { AlertStatus, Button, ButtonStyle, CircleIconWrapper, CircleIconWrapperColor } from "@components";
import { ArrowIcon, CalendarIcon, CheckmarkIcon, DiscordIcon, IconBox, IconSize, InstagramIcon, StarsLightSparkleIcon, TelegramIcon, TiktokIcon, UserProfileIcon, XIcon, YoutubeIcon } from "@icons";
import { useAlerts, useAuth, useTelegram } from "@providers";
import { postClaimQuest } from "@services";
import { Quest, QuestType } from "@types";
import { EnumMatcher, EnumToFCMatcher, FlexGapColumn4AlignFlexStart, FlexGapRow12FullWidth, FlexGapRow4, JustifyContent, TextXSMedium, TextXSRegular, TextXXSRegularGrey400, classJoiner } from "@utils";
import { FC, useState } from "react";
import styles from "./styles.module.css";
import { ApiRoutes, useData } from "@hooks";

const IconMatcher = new EnumToFCMatcher<QuestType, FC, FC>(
    {
        [QuestType.Telegram]: TelegramIcon,
        [QuestType.X]: XIcon,
        [QuestType.Instagram]: InstagramIcon,
        [QuestType.Youtube]: YoutubeIcon,
        [QuestType.Discord]: DiscordIcon,
        [QuestType.Tiktok]: TiktokIcon,
        [QuestType.Days]: CalendarIcon,
        [QuestType.Invite]: UserProfileIcon
    },
    StarsLightSparkleIcon
)

const TypeProgressLabelStringMatcher = new EnumMatcher<QuestType, string, ''>(
    {
        [QuestType.Days]: 'days',
        [QuestType.Game]: 'games',
        [QuestType.Points]: 'points'
    },
    ''
)

export const QuestItem: FC<Quest & { onClaim: () => any }> = ({
    uuid, name, isClaimed, type, progress, required, rewardPoints, rewardGameTickets, link, onClaim
}) => {

    const { authToken } = useAuth()
    const { sendAlert, sendApiErrorAlert } = useAlerts()
    const { openLink, openTelegramLink, shareLink } = useTelegram()
    const { data: refLink } = useData(ApiRoutes.GetInviteLink)
    const [showLoader, setShowLoader] = useState<boolean>(false)

    const claimQuest = async () => {
        try {
            await postClaimQuest(authToken, uuid)
            let message: string = 'Claimed'
            if (rewardPoints) message += ` +${rewardPoints.format()} points`
            if (rewardGameTickets) message += ` +${rewardGameTickets.format()} tickets`
            if (!rewardPoints && !rewardGameTickets) message += ` reward successfully`
            sendAlert({ status: AlertStatus.Success, withConfetti: true, message })
            onClaim()
        } catch (e) {
            sendApiErrorAlert(e)
        }
    }

    const onClick = async () => {
        if (isClaimed) return
        if (link && [QuestType.Discord, QuestType.Facebook, QuestType.Instagram, QuestType.Link, QuestType.Threads, QuestType.Telegram, QuestType.X, QuestType.Youtube, QuestType.Telegram].includes(type)) {
            if (type === QuestType.Telegram) openTelegramLink(link)
            else openLink(link)
            setShowLoader(true)
            setTimeout(async () => {
                await claimQuest()
                setShowLoader(false)
            }, 10_000)
        }
        if (type === QuestType.Invite && refLink) {
            shareLink(refLink.inviteLink)
        }
    }

    return (
        <div className={classJoiner(
            FlexGapRow12FullWidth.update({ justifyContent: JustifyContent.SpaceBetween }).className, styles.task,
            isClaimed ? styles.half_opacity : undefined
        )} onClick={onClick}>
            <div className={styles.icon_wrapper}>
                <IconBox icon={IconMatcher.match(type)} size={IconSize.MediumBig}/>
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
                    <Coin width={20} height={20}/>
                    <p className={TextXSRegular.className}>{rewardPoints.format()}</p>
                </div>
                {
                    required !== null && progress !== null
                    ?
                    <p className={TextXXSRegularGrey400.className}>
                        {progress.format()}/{required.format()} {TypeProgressLabelStringMatcher.match(type)}
                    </p>
                    :
                    null
                }
            </div>
            {
                showLoader
                ?
                <svg className={styles.loader} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10.5" stroke="#505760" stroke-width="3"/>
                    <path d="M12 1.5C13.9229 1.5 15.8089 2.02803 17.4522 3.02651C19.0955 4.02498 20.4331 5.45555 21.3191 7.16218C22.2051 8.86881 22.6054 10.786 22.4763 12.7045C22.3473 14.6231 21.6939 16.4694 20.5874 18.042" stroke="#B51CF7" stroke-width="3" stroke-linecap="round"/>
                </svg>
                :
                isClaimed
                ?
                <CircleIconWrapper color={CircleIconWrapperColor.Green600} icon={CheckmarkIcon}/>
                :
                [QuestType.Discord, QuestType.Facebook, QuestType.Instagram, QuestType.Link, QuestType.Telegram, QuestType.Threads, QuestType.Telegram, QuestType.X, QuestType.Youtube, QuestType.Invite].includes(type)
                ?
                <IconBox icon={ArrowIcon} size={IconSize.MediumBig}/>
                :
                required !== null && progress !== null
                ?
                required > progress
                ?
                <Button style={ButtonStyle.Primary} className={styles.button} disabled>
                    Claim
                </Button>
                :
                <Button style={ButtonStyle.Primary} className={styles.button} onClick={(e) => {
                    e.stopPropagation()
                    claimQuest()
                }}>
                    Claim
                </Button>
                :
                null
            }
        </div>
    )
}