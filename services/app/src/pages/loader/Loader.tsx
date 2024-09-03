import { HeroGood } from "@assets";
import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FlexGapBuilder, FlexGapColumn8, TextColor, TextSize, TextStyleBuilder, TextWeight, TextXSMedium } from "@utils";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.css";

export const LoaderPage: FC = () => {

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let int: NodeJS.Timeout
        int = setInterval(() => setProgress(prev => {
            if (prev === 100) {
                clearInterval(int)
                return prev
            }
            return prev + 1
        }), 15)
        return () => clearInterval(int)
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={new FlexGapBuilder({ relativePosition: true }).className}>
                <h1 className={new TextStyleBuilder({ size: TextSize.XXLarge, weight: TextWeight.Bold, color: TextColor.MainWhite }).className}>
                    Learn crypto<br/>
                    earn coins
                </h1>
                <PageTitleBackground color={PageTitleBackgroundColor.Purple}/>
            </div>
            <div className={styles.frog}>
                <HeroGood className={styles.frog_static}/>
                <DotLottieReact
                    autoplay
                    loop
                    src="/animations/frog.lottie"
                />
            </div>

            <div className={FlexGapColumn8.className}>
                <div className={styles.loader_wrapper}>
                    <div/>
                    <div style={{ '--progress': `${progress.toString()}%` } as React.CSSProperties}/>
                </div>
                <p className={TextXSMedium.className}>
                    {progress.toString()}%
                </p>
            </div>
        </div>
    )
}