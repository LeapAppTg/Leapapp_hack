import { ElementRef, FC, PropsWithChildren, useLayoutEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type StickyPanelProps = {
    withoutPlaceholder?: boolean
}

export const StickyPanel: FC<PropsWithChildren<StickyPanelProps>> = ({ children, withoutPlaceholder }) => {

    const ref = useRef<ElementRef<"div">>(null)
    const [height, setHeight] = useState(0)

    useLayoutEffect(() => {
        if (!ref.current) return
        const { height } = ref.current?.getBoundingClientRect()
        setHeight(height - 40 > 0 ? height - 40 : height)
    }, [])

    return (
        <>
            <div className={styles.sticky_panel} ref={ref}>
                {children}
            </div>
            {
                !withoutPlaceholder
                ?
                <div style={{ height: `${height}px`, minHeight: `${height}px`, width: `100%` }}/>
                :
                null
            }
        </>
    )
}