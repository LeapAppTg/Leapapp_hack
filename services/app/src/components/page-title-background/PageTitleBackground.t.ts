export enum PageTitleBackgroundColor {
    Blue = 'blue',
    Yellow = 'yellow',
    Purple = 'purple',
    Green = 'green'
}

export type PageTitleBackgroundProps = {
    color: PageTitleBackgroundColor,
    className?: string
}
