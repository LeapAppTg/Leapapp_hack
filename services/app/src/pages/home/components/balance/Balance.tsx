import { ApiRoutes, useData } from "@hooks";
import { FrogIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { TextMSemiBold } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

export const Balance: FC = () => {
    
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)

    return (
        <>
        <div className={styles.stats_wrapper}>
            <div className={styles.stat}>
                <IconBox icon={PointsIcon} size={IconSize.MediumBig}/>
                <p className={TextMSemiBold.className}>{userProfile?.points.format() || '0'}</p>
            </div>
            <div className={styles.stat}>
                <IconBox icon={FrogIcon} size={IconSize.MediumBig}/>
                <p className={TextMSemiBold.className}>{userProfile?.gameTickets.format() || '0'}</p>
            </div>
        </div>
        </>
    )
}