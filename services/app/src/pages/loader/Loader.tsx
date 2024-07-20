import { FC } from "react";
import styles from "./styles.module.css";
import { Loader } from "@components";

export const LoaderPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Loader/>
        </div>
    )
}