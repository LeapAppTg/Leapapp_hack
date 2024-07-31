import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FC } from "react";
import styles from "./styles.module.css";

export const LeapIllustration: FC = () => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.illustration}>
                <p>リープ</p>
                <DotLottieReact
                    src="/animations/coins.lottie"
                    loop
                    autoplay
                />
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