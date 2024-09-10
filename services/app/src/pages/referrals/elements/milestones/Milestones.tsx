import { FC, Fragment } from "react";
import styles from "./styles.module.css";
import { Milestone } from "../../components";
import { classJoiner } from "@utils";
import { ApiRoutes, useData } from "@hooks";

export const Milestones: FC = () => {

    const { data: milestones } = useData(ApiRoutes.GetReferralsMilestonesList)

    if (!milestones) return

    return (
        <div className={styles.wrapper}>
            <div>
                {
                    milestones.milestones.map(({ isClaimed, milestone }, i) => (
                        <Fragment key={milestone.uuid}>
                            {
                                i === 0
                                ?
                                null
                                :
                                <div className={classJoiner(styles.separator, milestones.milestones[i - 1].isClaimed && !isClaimed ? styles.highlighted : undefined)}/>
                            }
                            <Milestone referralsMilestone={milestone.referralsMilestone} pointsReward={milestone.pointsReward} claimed={isClaimed} prevClaimed={i !== 0 && milestones.milestones[i - 1].isClaimed}/>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}