import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const ClockIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path className={strokeColor} d="M6.66602 11.9998H9.33268" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M11.319 2H4.68034C4.31234 2 4.01367 2.29867 4.01367 2.66667V4.252C4.01367 4.53267 4.10234 4.80667 4.26701 5.034L6.41367 8L4.26701 10.966C4.10234 11.1933 4.01367 11.4673 4.01367 11.748V13.3333C4.01367 13.7013 4.31234 14 4.68034 14H11.3183C11.6863 14 11.985 13.7013 11.985 13.3333V11.772C11.985 11.476 11.8863 11.1887 11.705 10.9547L9.41367 8L11.7057 5.04467C11.887 4.81067 11.9857 4.52333 11.9857 4.22733V2.66667C11.9857 2.29867 11.687 2 11.319 2Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}