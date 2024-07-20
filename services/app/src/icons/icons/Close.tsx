import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const CloseIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={strokeColor} d="M6.99976 7.00005L16.9999 17.0002" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M16.9999 6.99989L6.99976 17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>        
    )
}