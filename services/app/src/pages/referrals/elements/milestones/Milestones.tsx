import { FC, Fragment, useCallback, useMemo } from "react";
import styles from "./styles.module.css";
import { Milestone } from "../../components";
import { classJoiner } from "@utils";
import { ApiRoutes, useData } from "@hooks";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
        mutate(prev => prev ? { count: prev.count, milestones: prev.milestones.map(m => m.uuid === uuid ? { ...m, isClaimed: true } : m) } : prev)
    }, [mutate])

    if (!list.length) return

    return (
        <div className={styles.wrapper}>
            <div>
                {
                    list.map((milestone, i) => (
                        <Fragment key={milestone.uuid}>
                            {
                                i === 0
                                ?
                                null
                                :
                                milestone.isPrevClaimed && !milestone.isClaimed
                                ?
                                <div className={classJoiner(styles.separator, styles.highlighted)}>
                                    <div className={styles.plane}>
                                        <DotLottieReact src="/animations/paperplane.lottie" loop autoplay/>
                                    </div>
                                </div>
                                :
                                <div className={styles.separator}/>
                            }
                            <Milestone {...milestone} isFirst={i === 0} prevClaimed={milestone.isPrevClaimed} claimCallback={claimCallback}/>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}