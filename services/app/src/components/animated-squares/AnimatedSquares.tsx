import { FC } from "react";
import styles from "./styles.module.css";
import { SquaresPattern } from "@assets";

export const AnimatedSquares: FC = () => {
    return (
        <SquaresPattern className={styles.squares}/>
    )
}