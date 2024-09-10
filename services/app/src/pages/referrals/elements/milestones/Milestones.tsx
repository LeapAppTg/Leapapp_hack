import { FC } from "react";
import styles from "./styles.module.css";
import { Milestone } from "../../components";
import { classJoiner } from "@utils";

export const Milestones: FC = () => {

    return (
        <div className={styles.wrapper}>
            <div>
                <Milestone referralsMilestone={0} pointsReward={0} claimed/>
                <div className={classJoiner(styles.separator, styles.highlighted)}/>
                <Milestone referralsMilestone={1} pointsReward={1_000} claimed/>
                <div className={styles.separator}/>
                <Milestone referralsMilestone={3} pointsReward={5_000} nextGoal/>
                <div className={styles.separator}/>
                <Milestone referralsMilestone={5} pointsReward={10_000}/>
                <div className={styles.separator}/>
                <Milestone referralsMilestone={10} pointsReward={100_000}/>
            </div>
        </div>
    )
}