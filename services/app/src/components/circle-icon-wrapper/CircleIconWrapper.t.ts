import { IconFC } from "@icons"

export enum CircleIconWrapperColor {
    Yellow = 'yellow',
    Pink = 'pink',
    Grey500 = 'grey_500',
    Grey700 = 'grey_700',
    Green600 = 'green_600',
    Blue = 'blue',
    LightGreen = 'light_green',
    Red500 = 'red_500'
}

export type CircleIconWrapperProps = {
    color: CircleIconWrapperColor,
    icon: IconFC
}