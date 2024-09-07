import { Button, ButtonStyle, PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { IconSize, TelegramIcon } from "@icons";
import { useAlerts, useTelegram } from "@providers";
import { FlexGapColumn20FullWidth } from "@utils";
import mixpanel from "mixpanel-browser";
import { FC } from "react";

export const InvitePopup: FC = () => {

    const { data: inviteLink } = useData(ApiRoutes.GetInviteLink)
    const { sendAlert } = useAlerts()
    const { shareLink } = useTelegram()

    function onCopy () {
        if (!inviteLink) return
        navigator.clipboard.writeText(inviteLink.inviteLink)
        sendAlert({
            message: 'Copied invite link'
        })
        mixpanel.track("copy_invite_link")
    }

    function onShare () {
        if (!inviteLink) return
        shareLink(inviteLink.inviteLink)
        mixpanel.track("share_invite_link")
    }

    return (
        <>
        <PageTitle color={PageTitleBackgroundColor.Blue} icon={TelegramEmojiType.Megaphone} title="Invite frens" subtitle="Have more fun in Leap with your frens"/>
        <div className={FlexGapColumn20FullWidth.className}>
            <Button style={ButtonStyle.Secondary} fillFullWidth onClick={onCopy}>
                Copy link
            </Button>
            <Button style={ButtonStyle.Primary} fillFullWidth onClick={onShare}>
                <TelegramIcon size={IconSize.Medium}/>
                Send to friend
            </Button>
        </div>
        </>
    )
}