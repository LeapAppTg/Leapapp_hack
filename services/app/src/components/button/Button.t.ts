import { IconFC } from "@icons"
import { MouseEventHandler } from "react"

export enum ButtonStyle {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary',
    Link = 'link'
}

export type ButtonProps = {
    style: ButtonStyle,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    linkTo?: string,
    fillFullWidth?: boolean,
    fillFullHeight?: boolean,
    rightIcon?: IconFC,
    className?: string,
    id?: string
}