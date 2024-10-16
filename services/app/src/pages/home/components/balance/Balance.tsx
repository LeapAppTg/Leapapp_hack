import { Coin, TicketEmoji } from "@assets";
import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { ApiRoutes, useData } from "@hooks";
import { useTelegram } from "@providers";
import { FlexGapColumn8, FlexGapRow24, FlexGapRow8, TextLSemiBold, TextXLSemiBold, TextXSRegular } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

export const Balance: FC = () => {
    
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)
    const { userPfp } = useTelegram()

    return (
        <div className={FlexGapColumn8.className}>
            <PageTitleBackground color={PageTitleBackgroundColor.LightBlue} className={styles.purple_bg}/>
            {
                userPfp
                ?
                <img className={styles.avatar} src={userPfp}/>
                :
                <div className={styles.avatar}>
                    <p className={TextXLSemiBold.className}>{
                        userProfile?.username
                        ?
                        userProfile?.username.charAt(0).toUpperCase()
                        :
                        userProfile?.firstName.charAt(0).toUpperCase()
                    }</p>
                </div>
            }
            <p className={TextXSRegular.className}>
                {userProfile?.firstName} {userProfile?.lastName}
            </p>
            <div className={FlexGapRow24.className}>
                <div className={FlexGapRow8.className}>
                    <Coin width={28} height={28}/>
                    <p className={TextLSemiBold.className}>{userProfile?.points.format() || '0'}</p>
                </div>
                <div className={FlexGapRow8.className}>
                    <TicketEmoji width={28} height={28}/>
                    <p className={TextLSemiBold.className}>{userProfile?.gameTickets.format() || '0'}</p>
                </div>
            </div>
        </div>
    )
}