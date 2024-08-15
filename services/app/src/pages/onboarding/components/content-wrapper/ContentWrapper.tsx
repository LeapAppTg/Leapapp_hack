import { Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FlexGapColumn20FullWidth, FlexGapColumn24FullWidth, FlexGapRow8, TextSRegular, TextXLSemiBold, classJoiner } from "@utils";
import { FC, PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.css";

type ContentWrapperProps = {
    title: string | ReactNode,
    description: string | ReactNode,
    onNext?: () => any,
    step: number
}

export const ContentWrapper: FC<PropsWithChildren<ContentWrapperProps>> = ({
    title, description, children, onNext, step
}) => {

    return (
        <div className={styles.wrapper}>
            {children}

            <div className={FlexGapColumn20FullWidth.className}>

                <div className={FlexGapColumn24FullWidth.className}>
                    <h1 className={TextXLSemiBold.className}>
                        {title}
                    </h1>
                    <p className={TextSRegular.className}>
                        {description}
                    </p>
                </div>

                <div className={FlexGapRow8.className}>
                    <Dot isActive={step === 1}/>
                    <Dot isActive={step === 2}/>
                    <Dot isActive={step === 3}/>
                    <Dot isActive={step === 4}/>
                    <Dot isActive={step === 5}/>
                </div>

                <Button style={ButtonStyle.Primary} fillFullWidth onClick={onNext}>
                    Continue
                </Button>
            </div>

        </div>
    )
}

const Dot: FC<{ isActive?: boolean }> = ({ isActive }) => {
    if (isActive) return (
        <div className={styles.active_dot}>
            <div/>
        </div>
    )
    return <div className={styles.dot}/>
}