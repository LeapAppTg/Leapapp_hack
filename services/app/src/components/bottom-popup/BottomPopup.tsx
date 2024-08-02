import { CloseIcon, IconBox, IconSize } from "@icons";
import { useBottomPopup, useTelegram } from "@providers";
import { FlexGapRowFullWidthJustifyFlexEnd, classJoiner } from "@utils";
import { ElementRef, FC, PropsWithChildren, useEffect, useRef } from "react";
import styles from './styles.module.css';
import { useOutsideClick } from "@hooks";

export const BottomPopup: FC<PropsWithChildren> = ({
    children
}) => {

    const ref = useRef<ElementRef<"div">>(null)
    const { hidePopup, isClosing } = useBottomPopup()
    const { backButton, backButtonDefaultCallback } = useTelegram()
    useOutsideClick(() => hidePopup(), [ref])

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
        <div className={classJoiner(styles.popup, isClosing ? styles.close : undefined)} ref={ref}>
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