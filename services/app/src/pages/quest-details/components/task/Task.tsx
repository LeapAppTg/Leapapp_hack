import { ArrowIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { FlexGapColumn4AlignFlexStart, FlexGapRow12, FlexGapRow4, FlexGapRow8FullWidthJustifySpaceBetween, TextAlign, TextXSMedium, TextXXSRegular, TextXXSRegularGrey400, classJoiner } from "@utils";
import { FC } from "react";
import { Link } from "react-router-dom";
import { TaskStatusIcon } from "../";
import styles from "./styles.module.css";

export enum TaskStatus {
    Active = 'active',
    Completed = 'completed',
    TimeLocked = 'time_locked'
}

type TaskProps = {
    title: string,
    description?: string,
    reward?: number,
    status: TaskStatus,
    link?: string
}

export const Task: FC<TaskProps> = ({
    status, title, description, link, reward
}) => {

    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className}>
            <div className={classJoiner(FlexGapRow12.update({ hideOverflow: true }).className, status === TaskStatus.Active ? undefined : styles.half_opacity)}>
                <div className={styles.icon}>
                    <PointsIcon size={IconSize.Large}/>
                </div>
                <div className={FlexGapColumn4AlignFlexStart.update({ hideOverflow: true }).className}>
                    <p className={TextXSMedium.className}>{title}</p>
                    {
                        reward
                        ?
                        <div className={FlexGapRow4.className}>
                            <p className={TextXXSRegular.className}>+{reward.format("default", 2)}</p>
                            <IconBox size={IconSize.Medium} icon={PointsIcon}/>
                        </div>
                        :
                        <p className={TextXXSRegularGrey400.update({ textAlign: TextAlign.Left, cropText: true }).className}>{description}</p>
                    }
                </div>
            </div>
            {
                status === TaskStatus.Active
                ?
                link
                ?
                <Link to={link} target="_blank">
                    <IconBox size={IconSize.MediumBig} icon={ArrowIcon}/>
                </Link>
                :
                <div/>
                :
                <TaskStatusIcon type={status}/>
            }

        </div>
    )
}