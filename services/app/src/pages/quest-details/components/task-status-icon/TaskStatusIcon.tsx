import { FC } from "react";
import styles from "./styles.module.css";
import { CheckmarkIcon, ClockIcon, IconBox, IconFC, IconSize } from "@icons";
import { EnumToFCMatcher, classBuilder } from "@utils";
import { TaskStatus } from "../task/Task";

type TaskStatusIconProps = {
    type: TaskStatus
}

const IconMatcher = new EnumToFCMatcher<TaskStatus, IconFC, IconFC>(
    {
        [TaskStatus.Completed]: CheckmarkIcon,
        [TaskStatus.TimeLocked]: ClockIcon
    },
    CheckmarkIcon
)

export const TaskStatusIcon: FC<TaskStatusIconProps> = ({ type }) => {

    const className = classBuilder(
        styles,
        [type],
        styles.status
    )

    return (
        <div className={className}>
            <IconBox icon={IconMatcher.match(type)} size={IconSize.Small}/>
        </div>
    )
}