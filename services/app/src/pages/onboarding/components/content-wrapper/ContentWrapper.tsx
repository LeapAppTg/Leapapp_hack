import { Button, ButtonStyle, PageTitleBackground, PageTitleBackgroundColor } from "@components";
import { FlexGapColumn20FullWidth, FlexGapColumn24FullWidth, TextSRegular, TextXLSemiBold } from "@utils";
import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

type ContentWrapperProps = {
    color?: PageTitleBackgroundColor,
    title: string,
    description: string,
    noSkip?: boolean,
    topButtonLabel?: string
}

export const ContentWrapper: FC<PropsWithChildren<ContentWrapperProps>> = ({
    title, description, children, color, noSkip, topButtonLabel
}) => {

    return (
        <div className={styles.wrapper}>
            { color ? <PageTitleBackground color={color}/> : null }

            <div className={FlexGapColumn24FullWidth.className}>
                {children}
                <h1 className={TextXLSemiBold.className}>
                    {title}
                </h1>
                <p className={TextSRegular.className}>
                    {description}
                </p>
            </div>

            <div className={FlexGapColumn20FullWidth.className}>
                <Button style={ButtonStyle.Primary} fillFullWidth>
                    {topButtonLabel || 'Next'}
                </Button>
                {
                    noSkip
                    ?
                    null
                    :
                    <Button style={ButtonStyle.Link} fillFullWidth>
                        Skip
                    </Button>
                }
            </div>

        </div>
    )
}