import { CloseIcon, IconBox, IconSize } from "@icons";
import { useBottomPopup } from "@providers";
import { FlexGapRowFullWidthJustifyFlexEnd, classJoiner } from "@utils";
import { FC, PropsWithChildren } from "react";
import styles from './styles.module.css';

export const BottomPopup: FC<PropsWithChildren> = ({
    children
}) => {

    const { hidePopup, isClosing } = useBottomPopup()

    return (
        <div className={classJoiner(styles.popup, isClosing ? styles.close : undefined)}>
            <div className={FlexGapRowFullWidthJustifyFlexEnd.className}>
                <button className={styles.close_wrapper} onClick={hidePopup}>
                    <IconBox size={IconSize.MediumBig} icon={CloseIcon}/>
                </button>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}