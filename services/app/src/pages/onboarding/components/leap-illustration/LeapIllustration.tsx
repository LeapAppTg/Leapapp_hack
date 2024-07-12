import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FC } from "react";
import Lottie from 'react-lottie';
import coinsAnimation from './coins.json';
import frogAnimation from './frog.json';
import styles from "./styles.module.css";

export const LeapIllustration: FC = () => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.illustration}>
                <p>リープ</p>
                <Lottie
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: coinsAnimation
                    }}
                    isClickToPauseDisabled
                />
                <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg}/>
                <p>飞跃</p>
            </div>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: frogAnimation
                }}
                isClickToPauseDisabled
                height={80}
                width={80}
            />
        </div>
    )
}