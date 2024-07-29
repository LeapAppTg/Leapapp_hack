import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const SecurityLockIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M11.334 14H4.66732C3.93065 14 3.33398 13.4033 3.33398 12.6667V7.33333C3.33398 6.59667 3.93065 6 4.66732 6H11.334C12.0707 6 12.6673 6.59667 12.6673 7.33333V12.6667C12.6673 13.4033 12.0707 14 11.334 14Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M8.0013 11.3932V9.6665" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M8.35355 8.81295C8.54881 9.00821 8.54881 9.3248 8.35355 9.52006C8.15829 9.71532 7.84171 9.71532 7.64645 9.52006C7.45118 9.3248 7.45118 9.00821 7.64645 8.81295C7.84171 8.61769 8.15829 8.61769 8.35355 8.81295" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M5.33398 6V4.66667V4.66667C5.33398 3.194 6.52798 2 8.00065 2V2C9.47332 2 10.6673 3.194 10.6673 4.66667V4.66667V6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}