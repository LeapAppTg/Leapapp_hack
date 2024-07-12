import { FC } from "react";
import styles from "./styles.module.css";
import { ArrowIcon, DragNDropIcon, IconBox, IconColor, IconRotation, IconSize } from "@icons";

export const GameSlider: FC = () => {
    return (
        <div className={styles.slider}>
            <IconBox size={IconSize.Small} icon={ArrowIcon} rotation={IconRotation.Degs180} color={IconColor.Experimental1}/>
            <IconBox size={IconSize.MediumBig}  icon={DragNDropIcon} color={IconColor.Experimental1}/>
            <IconBox size={IconSize.Small}  icon={ArrowIcon} color={IconColor.Experimental1}/>
        </div>
    )
}