import { CloseIcon, IconBox, IconSize } from "@icons";
import { useBottomPopup, useTelegram } from "@providers";
import { FlexGapRowFullWidthJustifyFlexEnd, classJoiner } from "@utils";
import { FC, PropsWithChildren, useEffect } from "react";
import styles from './styles.module.css';

export const BottomPopup: FC<PropsWithChildren> = ({
    children
}) => {

    const { hidePopup, isClosing } = useBottomPopup()
    const { backButton, backButtonDefaultCallback } = useTelegram()

    useEffect(() => {
        if (!backButton) return
        if (!backButton.isVisible) {
            backButton.show()
            backButton.on("click", hidePopup)
            return () => {
                backButton.off("click", hidePopup)
                backButton.hide()
            }
        } else {
            backButton.off("click", backButtonDefaultCallback)
            backButton.on("click", hidePopup)
            return () => {
                backButton.off("click", hidePopup)
                backButton.on("click", backButtonDefaultCallback)
            }
        }
    }, [])

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