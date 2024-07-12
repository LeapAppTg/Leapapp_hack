
export enum ButtonStyle {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    Link = 'link'
}

export type ButtonProps = {
    style: ButtonStyle,
    onClick?: () => any,
    disabled?: boolean,
    linkTo?: string,
    fillFullWidth?: boolean
}