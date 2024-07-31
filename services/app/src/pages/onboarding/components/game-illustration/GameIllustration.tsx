import { DollarCoin, GoldCoin, HeroThugCoin, MagnetCoin, UfoCoin } from "@assets";
import { GameSlider, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const GameIllustration: FC<PropsWithChildren> = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.illustration}>
                <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.purple_bg}/>
                
                <MagnetCoin className={styles.game_token}/>
                <GoldCoin className={styles.game_token}/>
                <GoldCoin className={styles.game_token}/>
                <UfoCoin className={styles.game_token}/>
                <DollarCoin className={styles.game_token}/>

                <div className={styles.hero_wrapper}>
                    <HeroThugCoin className={styles.hero}/>
                    <GameSlider/>
                </div>
            </div>
        </div>
    )
}