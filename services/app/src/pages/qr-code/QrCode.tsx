import { FC } from "react";
import styles from "./styles.module.css";
import { TextMMedium, TextXLSemiBold } from "@utils";
import { HeroGood } from "@assets";
import { PageTitleBackground, PageTitleBackgroundColor } from "@components";

export const QrCodePage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <PageTitleBackground className={styles.bg_a} color={PageTitleBackgroundColor.Purple}/>
            <PageTitleBackground className={styles.bg_b} color={PageTitleBackgroundColor.Purple}/>
            <h1 className={TextXLSemiBold.className}>
                Play on your<br/>mobile
            </h1>
            <img className={styles.qr} src='/other/tg_qr.png'/>
            <h3 className={TextMMedium.className}>
                @LeapTon
            </h3>
            <HeroGood className={styles.hero}/>
        </div>
    )
}