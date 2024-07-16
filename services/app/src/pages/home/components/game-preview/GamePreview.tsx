import { DotsBackground, EyeCoin, GoldCoin, HeroSad2, UfoCoin } from "@assets";
import { GameSlider, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { TextLSemiBold, TextSRegular } from "@utils";
import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const GamePreview: FC<PropsWithChildren> = () => {
    return (
        <div className={styles.wrapper}>
            <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.purple_bg}/>
            <div className={styles.overflow}>
                <p className={TextSRegular.className}>
                    Leap is hungry...
                </p>
                <p className={TextLSemiBold.className}>
                    Coming soon...
                </p>
            </div>
            <div className={styles.illustration}>
                <DotsBackground className={styles.background}/>
                
                <GoldCoin className={styles.gold}/>
                <UfoCoin className={styles.ufo}/>
                <EyeCoin className={styles.eye}/>
                <div className={styles.hero_wrapper}>
                    <HeroSad2 className={styles.hero}/>
                    <GameSlider/>
                </div>
            </div>
        </div>
    )
}