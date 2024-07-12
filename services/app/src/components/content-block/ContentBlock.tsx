import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";
import { ContentBlockProps } from "./ContentBlock.t";
import { classBuilder } from "@utils";

export const ContentBlock: FC<PropsWithChildren<ContentBlockProps>> = ({ gap, children }) => {

    const className = classBuilder(
        styles,
        [gap],
        styles.content_block
    )

    return (
        <div className={className}>
            {children}
        </div>
    )
}