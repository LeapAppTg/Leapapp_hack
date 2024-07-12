import { DollarCoin, DotsBackground, EyeCoin, GoldCoin, HeroHalfOpen, MagnetCoin } from "@assets";
import { GameSlider, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const GameIllustration: FC<PropsWithChildren> = () => {
    return (
        <div className={styles.wrapper}>
            <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.purple_bg}/>
            <div className={styles.illustration}>
                <DotsBackground className={styles.background}/>
                
                <MagnetCoin className={styles.magnet}/>
                <GoldCoin className={styles.gold_a}/>
                <GoldCoin className={styles.gold_b}/>
                <EyeCoin className={styles.eye_a}/>
                <EyeCoin className={styles.eye_b}/>
                <DollarCoin className={styles.dollar}/>
                <div className={styles.hero_wrapper}>
                    <HeroHalfOpen className={styles.hero}/>
                    <GameSlider/>
                </div>
                
            </div>
        </div>
    )
}