import { FC } from "react";
import styles from "./styles.module.css";
import { TextMMedium, TextXLSemiBold } from "@utils";
import { HeroGood } from "@assets";
import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { Link } from "react-router-dom";

export const QrCodePage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <PageTitleBackground className={styles.bg_a} color={PageTitleBackgroundColor.Purple}/>
            <PageTitleBackground className={styles.bg_b} color={PageTitleBackgroundColor.Purple}/>
            <h1 className={TextXLSemiBold.className}>
                Play on your<br/>mobile
            </h1>
            <Link className={styles.qr} to={'https://t.me/leapapp_bot'}>
                <img src='/other/tg_qr.png'/>
            </Link>
            <Link to={'https://t.me/leapapp_bot'}>
                <h3 className={TextMMedium.className}>
                    @LeapApp_bot
                </h3>
            </Link>
            <HeroGood className={styles.hero}/>
        </div>
    )
}