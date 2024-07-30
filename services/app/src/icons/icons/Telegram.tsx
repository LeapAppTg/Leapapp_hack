import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const TelegramIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M12.7038 16.59L17.2505 4.32333C17.498 3.655 16.8471 3.005 16.1796 3.2525L3.90882 7.80249C3.14132 8.08749 3.20132 9.19249 3.99548 9.39166L9.69048 10.8225L11.113 16.5025C11.313 17.2975 12.4188 17.3583 12.7038 16.59V16.59Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M17.0581 3.44189L9.69141 10.8252" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}