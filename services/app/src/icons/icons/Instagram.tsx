import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const InstagramIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M7.496 3H16.505C18.987 3 21 5.012 21 7.496V16.505C21 18.987 18.988 21 16.504 21H7.496C5.013 21 3 18.988 3 16.504V7.496C3 5.013 5.012 3 7.496 3V3Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M16.9487 6.71279C16.7627 6.71379 16.6117 6.86479 16.6117 7.05079C16.6117 7.23679 16.7637 7.38779 16.9497 7.38779C17.1357 7.38779 17.2867 7.23679 17.2867 7.05079C17.2877 6.86379 17.1357 6.71279 16.9487 6.71279" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M14.546 9.45432C15.9519 10.8602 15.9519 13.1396 14.546 14.5455C13.1401 15.9514 10.8607 15.9514 9.45481 14.5455C8.04892 13.1396 8.04892 10.8602 9.45481 9.45432C10.8607 8.04843 13.1401 8.04843 14.546 9.45432" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}