import { FC } from "react";
import styles from "./styles.module.css";
import { HeroGood, Wrench } from "@assets";
import { TextMSemiBold, TextXSRegularGrey400 } from "@utils";

export const ComingSoon: FC = () => {

    return (
        <div className={styles.coming_soon}>
            <div className={styles.hero}>
                <HeroGood width={60} height={60}/>
                <Wrench width={38} height={41} className={styles.wrench}/>
            </div>
            <p className={TextMSemiBold.className}>
                Coming soon
            </p>
            <p className={TextXSRegularGrey400.className}>
                We are on it
            </p>
        </div>
    )
}