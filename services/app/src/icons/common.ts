import { classBuilder } from "@utils"
import { FC, MouseEvent as ReactMouseEvent} from "react"

import styles from './styles.module.css'

export type IconProps = {
    size?: IconSize,
    classes?: string,
    color?: IconColor,
    opacity?: IconOpacity,
    rotation?: IconRotation
}

export type IconBoxProps = {
    icon: IconFC,
    color?: IconColor,
    size?: IconSize,
    classes?: string,
    span?: boolean,
    onClick?: (e?: ReactMouseEvent) => any,
    opacity?: IconOpacity,
    rotation?: IconRotation
}

export enum IconSize {
    /**@height 40px*/
    Large = 'large',
    /**@height 24px*/
    MediumBig = 'medium_big',
    /**@height 20px*/
    Medium = 'medium',
    /**@height 16px*/
    Small = 'small'
}

/**
 *@default color-main-white
*/
export enum IconColor {
    /**
     *@color color-main-white
    */
    MainWhite = 'color_main_white',
    /**
     *@color color-grey-400
    */
    Grey400 = 'color_grey_400',
    /**
     *@color color-purple-400
    */
    Purple400 = 'color_purple_400',
    /**
     *@color color-experimental-1
    */
    Experimental1 = 'color_experimental_1'
}

export enum IconOpacity {
    /**@opacity 50%*/
    Half = 'opacity_half',
}


export enum IconRotation {
    /**@transform: rotate(180deg)*/
    Degs180 = 'rotation_180'
}

export type IconFC = FC<IconProps>
export type IconBoxFC = FC<IconBoxProps>

export const getIconClassName = ({ classes, color, size, opacity, rotation }: IconProps, ignoreColor?: boolean) => {
    return classBuilder(
        styles,
        [(ignoreColor ? undefined : color ? color : IconColor.MainWhite), size, opacity, rotation],
        classes
    )
}

export const getColorFillClassName = (color?: IconColor) => {
    const colorName = color || IconColor.MainWhite
    return styles[colorName + '_only_fill']
}

export const getColorStrokeClassName = (color?: IconColor) => {
    const colorName = color || IconColor.MainWhite
    return styles[colorName + '_only_stroke']
}