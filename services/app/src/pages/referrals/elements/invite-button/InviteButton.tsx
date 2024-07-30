import { Button, ButtonStyle, StickyPanel } from "@components";
import { IconSize, TelegramIcon } from "@icons";
import { useBottomPopup } from "@providers";
import { FC } from "react";
import { InvitePopup } from "../../components";

export const InviteButton: FC = () => {

    const { showPopup } = useBottomPopup()

    function onClick () {
        showPopup(<InvitePopup/>)
    }

    return (
        <StickyPanel>
            <Button style={ButtonStyle.Primary} fillFullWidth onClick={onClick}>
                <TelegramIcon size={IconSize.Medium}/>
                Invite frens
            </Button>
        </StickyPanel>
    )
}