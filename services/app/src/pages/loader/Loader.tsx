import { HeroGood } from "@assets";
import { PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FlexGapBuilder, FlexGapColumn8, TextColor, TextSize, TextStyleBuilder, TextWeight, TextXSMedium } from "@utils";
import { FC, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

export const LoaderPage: FC = () => {

    const [progress, setProgress] = useState(0)
    const skins = ["hero_happy", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    const [currentSrc, setSrc] = useState(0)

    useEffect(() => {
        const paths = skins.map(e => `/loader/${e}.svg`)
    
        for (let path of paths) {
          new Image().src = path
        }
      }, [])

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

    useEffect(() => {
        let int: NodeJS.Timeout
        int = setInterval(() => setSrc(prev => {
            if (prev === skins.length - 1) return 0
            return prev + 1
        }), 300)

        return () => clearInterval(int)
    }, [])

    return (
        <div className={styles.wrapper}>
            <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg_a}/>
            <div className={new FlexGapBuilder({ relativePosition: true }).className}>
                <h1 className={new TextStyleBuilder({ size: TextSize.XXLarge, weight: TextWeight.Bold, color: TextColor.MainWhite }).className}>
                    Learn crypto<br/>
                    earn coins
                </h1>
            </div>
            <img className={styles.frog} src={`/loader/${skins[currentSrc] || skins[0]}.svg`}/>

            <div className={FlexGapColumn8.className}>
                <div className={styles.loader_wrapper}>
                    <div/>
                    <div style={{ '--progress': `${progress.toString()}%` } as React.CSSProperties}/>
                </div>
                <p className={TextXSMedium.className}>
                    {progress.toString()}%
                </p>
            </div>
            <PageTitleBackground color={PageTitleBackgroundColor.Purple} className={styles.bg_b}/>
        </div>
    )
}