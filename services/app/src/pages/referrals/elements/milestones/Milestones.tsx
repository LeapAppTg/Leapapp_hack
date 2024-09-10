import { FC, Fragment, useCallback, useMemo } from "react";
import styles from "./styles.module.css";
import { Milestone } from "../../components";
import { classJoiner } from "@utils";
import { ApiRoutes, useData } from "@hooks";

export const Milestones: FC = () => {

    const { data: milestones, mutate } = useData(ApiRoutes.GetReferralsMilestonesList)

    const list = useMemo(() => {
        if (!milestones) return []
        return milestones.milestones.map((m, i) => ({
            isPrevClaimed: i !== 0 && milestones.milestones[i - 1].isClaimed,
            ...m
        }))
    }, [milestones])

    const claimCallback = useCallback((uuid: number) => {
        mutate(prev => prev ? { count: prev.count, milestones: prev.milestones.map(m => m.milestone.uuid === uuid ? { isClaimed: true, milestone: m.milestone } : m) } : prev)
    }, [mutate])

    if (!list.length) return

    return (
        <div className={styles.wrapper}>
            <div>
                {
                    list.map(({ isPrevClaimed, isClaimed, milestone }, i) => (
                        <Fragment key={milestone.uuid}>
                            {
                                i === 0
                                ?
                                null
                                :
                                <div className={classJoiner(styles.separator, isPrevClaimed && !isClaimed ? styles.highlighted : undefined)}/>
                            }
                            <Milestone {...milestone} claimed={isClaimed} prevClaimed={isPrevClaimed} claimCallback={claimCallback}/>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}