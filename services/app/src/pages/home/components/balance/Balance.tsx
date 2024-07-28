import { HeroThugCoin } from "@assets";
import { PageTitleBackground, PageTitleBackgroundColor, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { FlexGapColumn8, FlexGapRow24, FlexGapRow8, TextLSemiBold, TextXLSemiBold, TextXSRegular, classJoiner } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";
import { useTelegram } from "@providers";

export const Balance: FC = () => {
    
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)
    const { userPfp } = useTelegram()

    return (
        <div className={FlexGapColumn8.className}>
            <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.purple_bg}/>
            {
                userPfp
                ?
                <img className={styles.avatar} src={userPfp}/>
                :
                <div className={styles.avatar}>
                    <p className={TextXLSemiBold.className}>{userProfile?.username.charAt(0).toUpperCase()}</p>
                </div>
            }
            <p className={TextXSRegular.className}>
                Your balance
            </p>
            <div className={FlexGapRow24.className}>
                <div className={FlexGapRow8.className}>
                    <HeroThugCoin width={28} height={28}/>
                    <p className={TextLSemiBold.className}>{userProfile?.points.format() || '0'}</p>
                </div>
                <div className={FlexGapRow8.className}>
                    <TelegramEmoji size={TelegramEmojiSize.Small} type={TelegramEmojiType.Ticket}/>
                    <p className={TextLSemiBold.className}>{userProfile?.gameTickets.format() || '0'}</p>
                </div>
            </div>
        </div>
    )
}