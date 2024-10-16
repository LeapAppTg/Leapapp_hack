import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const CalendarIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 2V6" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 2V6" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 9H21" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 4H5C3.895 4 3 4.895 3 6V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V6C21 4.895 20.105 4 19 4Z" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.01268 12.729C6.87468 12.729 6.76268 12.841 6.76368 12.979C6.76368 13.117 6.87568 13.229 7.01368 13.229C7.15168 13.229 7.26368 13.117 7.26368 12.979C7.26368 12.841 7.15168 12.729 7.01268 12.729" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.0127 12.729C11.8747 12.729 11.7627 12.841 11.7637 12.979C11.7637 13.117 11.8757 13.229 12.0137 13.229C12.1517 13.229 12.2637 13.117 12.2637 12.979C12.2637 12.841 12.1517 12.729 12.0127 12.729" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.0127 12.729C16.8747 12.729 16.7627 12.841 16.7637 12.979C16.7637 13.117 16.8757 13.229 17.0137 13.229C17.1517 13.229 17.2637 13.117 17.2637 12.979C17.2637 12.841 17.1517 12.729 17.0127 12.729" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.01268 16.729C6.87468 16.729 6.76268 16.841 6.76368 16.979C6.76368 17.117 6.87568 17.229 7.01368 17.229C7.15168 17.229 7.26368 17.117 7.26368 16.979C7.26368 16.841 7.15168 16.729 7.01268 16.729" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.0127 16.729C11.8747 16.729 11.7627 16.841 11.7637 16.979C11.7637 17.117 11.8757 17.229 12.0137 17.229C12.1517 17.229 12.2637 17.117 12.2637 16.979C12.2637 16.841 12.1517 16.729 12.0127 16.729" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}