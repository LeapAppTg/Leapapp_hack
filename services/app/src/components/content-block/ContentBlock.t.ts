
/**
 * @default @gap 16px
 */
export enum ContentBlockGap {
    /**
     * @gap 12px
     */
    Gap12 = 'gap_12'
}

export type ContentBlockProps = {
    gap?: ContentBlockGap
}