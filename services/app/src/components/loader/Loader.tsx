import { HeroGood } from "@assets";
import { FC } from "react";
import styles from "./styles.module.css";

export const Loader: FC = () => {

    return (
        <div className={styles.loader}>
            <HeroGood className={styles.hero}/>
            <div className={styles.circle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <circle fill="none" stroke="#B51CF7" strokeDashoffset={180} stroke-width="5.45" stroke-mitterlimit="0" cx="50" cy="50" r="47.275" stroke-dasharray="360" stroke-linecap="round"/>
                    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="3s" additive="sum" repeatCount="indefinite" />
                </svg>
            </div>
        </div>
    )
}