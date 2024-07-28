import { FC, PropsWithChildren, useState } from "react";
import styles from './styles.module.css';
import { FlexGapRowFullWidthJustifyFlexEnd, classJoiner } from "@utils";
import { CloseIcon, IconBox, IconSize } from "@icons";
import { useBottomPopup } from "@providers";

export const BottomPopup: FC<PropsWithChildren> = ({
    children
}) => {

    const [isClosing, setIsClosing] = useState<boolean>(false)
    const { hidePopup } = useBottomPopup()
    
    const onClose = () => {
        setTimeout(hidePopup, 500)
        setIsClosing(true)
    }

    return (
        <div className={classJoiner(styles.popup, isClosing ? styles.close : undefined)}>
            <div className={FlexGapRowFullWidthJustifyFlexEnd.className}>
                <button className={styles.close_wrapper} onClick={onClose}>
                    <IconBox size={IconSize.MediumBig} icon={CloseIcon}/>
                </button>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}