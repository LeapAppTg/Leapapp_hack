import { IconBox, IconSize } from "@icons";
import { classBuilder } from "@utils";
import { FC } from "react";
import { CircleIconWrapperProps } from "./CircleIconWrapper.t";
import styles from "./styles.module.css";

export const CircleIconWrapper: FC<CircleIconWrapperProps> = ({ color, icon }) => {

    const className = classBuilder(
        styles,
        [color],
        styles.status
    )

    return (
        <div className={className}>
            <IconBox icon={icon} size={IconSize.Small}/>
        </div>
    )
}