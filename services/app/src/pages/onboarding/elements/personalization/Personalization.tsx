import { FC } from "react";
import styles from "./styles.module.css";
import { PageTitleBackground, PageTitleBackgroundColor } from "@components";

export const Personalization: FC = () => {
    return (
        <div className={styles.wrapper}>
            <PageTitleBackground color={PageTitleBackgroundColor.Blue}/>

            <div className={styles.progress_wrapper}>
                <div className={styles.circle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <circle fill="none" stroke="#000" stroke-width="4" stroke-mitterlimit="0" cx="50" cy="50" r="48" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
                            <animate attributeName="stroke-dashoffset" values="360;0" dur="2s"/>
                        </circle>
                    </svg>
                </div>
                <div className={styles.circle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <circle fill="none" stroke="#000" stroke-width="4" stroke-mitterlimit="0" cx="50" cy="50" r="48" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
                            <animate attributeName="stroke-dashoffset" values="360;0" dur="2s"/>
                        </circle>
                    </svg>
                </div>
                <div className={styles.circle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <circle fill="none" stroke="#000" stroke-width="4" stroke-mitterlimit="0" cx="50" cy="50" r="48" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
                            <animate attributeName="stroke-dashoffset" values="360;0" dur="2s"/>
                        </circle>
                    </svg>
                </div>
                <div className={styles.circle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <circle fill="none" stroke="#000" stroke-width="4" stroke-mitterlimit="0" cx="50" cy="50" r="48" stroke-dasharray="360" stroke-linecap="round" transform="rotate(-90 ) translate(-100 0)" >
                            <animate attributeName="stroke-dashoffset" values="360;0" dur="2s"/>
                        </circle>
                    </svg>
                </div>
            </div>
        </div>
    )
}