import { Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FlexGapColumn20FullWidth, FlexGapColumn24FullWidth, TextSRegular, TextXLSemiBold, classJoiner } from "@utils";
import { FC, PropsWithChildren, ReactNode } from "react";
import styles from "./styles.module.css";

type ContentWrapperProps = {
    color?: PageTitleBackgroundColor,
    title: string,
    description: string | ReactNode,
    noSkip?: boolean,
    topButtonLabel?: string,
    onNext?: () => any,
    onSkip?: () => any,
    fillFullHeight?: boolean
}

export const ContentWrapper: FC<PropsWithChildren<ContentWrapperProps>> = ({
    title, description, children, color, noSkip, topButtonLabel, onNext, onSkip, fillFullHeight
}) => {

    return (
        <div className={styles.wrapper}>
            { color ? <PageTitleBackground color={color}/> : null }

            <div className={classJoiner(FlexGapColumn24FullWidth.className, fillFullHeight ? styles.full_height : undefined)}>
                {children}
                <h1 className={TextXLSemiBold.className}>
                    {title}
                </h1>
                <p className={TextSRegular.className}>
                    {description}
                </p>
            </div>

            <div className={FlexGapColumn20FullWidth.className}>
                <Button style={ButtonStyle.Primary} fillFullWidth onClick={onNext}>
                    {topButtonLabel || 'Next'}
                </Button>
                {
                    noSkip
                    ?
                    null
                    :
                    <Button style={ButtonStyle.Link} fillFullWidth onClick={onSkip}>
                        Skip
                    </Button>
                }
            </div>

        </div>
    )
}