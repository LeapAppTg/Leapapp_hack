import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const ShareIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path className={strokeColor} d="M7.12706 8.42842C7.995 9.29636 7.995 10.7036 7.12706 11.5715C6.25911 12.4395 4.85191 12.4395 3.98396 11.5715C3.11602 10.7036 3.11602 9.29636 3.98396 8.42842C4.85191 7.56048 6.25911 7.56048 7.12706 8.42842" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M16.0157 3.98433C16.8837 4.85227 16.8837 6.25948 16.0157 7.12742C15.1478 7.99536 13.7406 7.99536 12.8726 7.12742C12.0047 6.25948 12.0047 4.85227 12.8726 3.98433C13.7406 3.11639 15.1478 3.11639 16.0157 3.98433" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M16.0157 12.8726C16.8837 13.7406 16.8837 15.1478 16.0157 16.0157C15.1478 16.8837 13.7406 16.8837 12.8726 16.0157C12.0047 15.1478 12.0047 13.7406 12.8726 12.8726C13.7406 12.0047 15.1478 12.0047 16.0157 12.8726" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M7.5332 9.00829L12.4665 6.54163" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M7.5332 10.9917L12.4665 13.4584" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}