import { CircleIconWrapper, CircleIconWrapperColor } from "@components";
import { CheckmarkIcon, ClockIcon, IconFC } from "@icons";
import { EnumMatcher, EnumToFCMatcher } from "@utils";
import { FC } from "react";
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

const ColorMatcher = new EnumMatcher<TaskStatus, CircleIconWrapperColor, CircleIconWrapperColor>(
    {
        [TaskStatus.Completed]: CircleIconWrapperColor.Green600,
    },
    CircleIconWrapperColor.Grey500
)

export const TaskStatusIcon: FC<TaskStatusIconProps> = ({ type }) => {
    return <CircleIconWrapper icon={IconMatcher.match(type)} color={ColorMatcher.match(type)}/>
}