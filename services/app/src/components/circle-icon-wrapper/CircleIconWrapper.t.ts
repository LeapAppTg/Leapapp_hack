import { IconFC } from "@icons"

export enum CircleIconWrapperColor {
    Yellow = 'yellow',
    Pink = 'pink',
    Grey500 = 'grey_500',
    Green600 = 'green_600',
    Blue = 'blue',
    LightGreen = 'light_green'
}

export type CircleIconWrapperProps = {
    color: CircleIconWrapperColor,
    icon: IconFC
}