export enum PageTitleBackgroundColor {
    Blue = 'blue',
    LightBlue = 'light_blue',
    Yellow = 'yellow',
    Purple = 'purple',
    Green = 'green',
    Grey= 'grey'
}

export type PageTitleBackgroundProps = {
    color: PageTitleBackgroundColor,
    className?: string
}
