import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FC } from "react";
import styles from "./styles.module.css";
import { DollarCoin, GoldCoin, MagnetCoin, UfoCoin } from "@assets";

export const LeapIllustration: FC = () => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.illustration}>
                <p>リープ</p>
                <div className={styles.items}>
                    <GoldCoin width={28} height={28}/>
                    <UfoCoin width={28} height={28}/>
                    <GoldCoin width={28} height={28}/>
                    <MagnetCoin width={28} height={28}/>
                    <GoldCoin width={28} height={28}/>
                    <DollarCoin width={28} height={28}/>
                    <GoldCoin width={28} height={28}/>
                    <UfoCoin width={28} height={28}/>
                    <GoldCoin width={28} height={28}/>
                </div>
                <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg}/>
                <p>飞跃</p>
            </div>
            <div className={styles.frog}>
                <DotLottieReact
                    src="/animations/frog.lottie"
                    loop
                    autoplay
                />
            </div>
        </div>
    )
}