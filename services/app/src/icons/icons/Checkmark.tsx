import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const CheckmarkIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path className={strokeColor} d="M12.3327 5.3335L6.88506 10.6668L3.66602 7.51531" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}