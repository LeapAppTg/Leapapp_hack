import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const StarsLightSparkleIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M5.99776 2.99658C5.99776 5.20664 4.20615 6.99825 1.99609 6.99825C4.20615 6.99825 5.99776 8.78986 5.99776 10.9999C5.99776 8.78986 7.78937 6.99825 9.99943 6.99825C7.78937 6.99825 5.99776 5.20664 5.99776 2.99658Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M17.0021 15.0012C17.0021 12.2387 14.7626 9.99915 12 9.99915C14.7626 9.99915 17.0021 7.75964 17.0021 4.99707C17.0021 7.75964 19.2416 9.99915 22.0042 9.99915C19.2416 9.99915 17.0021 12.2387 17.0021 15.0012Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M17.0022 15.0015V16.0019" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M17.0022 4.997V3.99658" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M9.99923 21.0039V22.0043" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M9.99923 14.0009V13.0005" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M5.99728 10.9995V11.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M5.99728 1.99609V2.99651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M9.99971 13.501C9.99971 15.711 8.20811 17.5026 5.99805 17.5026C8.20811 17.5026 9.99971 19.2943 9.99971 21.5043C9.99971 19.2943 11.7913 17.5026 14.0014 17.5026C11.7913 17.5026 9.99971 15.711 9.99971 13.501Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}