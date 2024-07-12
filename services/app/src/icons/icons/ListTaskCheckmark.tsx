import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const ListTaskCheckmarkIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path className={strokeColor} d="M11.1338 12.3168H14.4685" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M16.1358 2.9137H4.46424C3.54338 2.9137 2.79688 3.6602 2.79688 4.58106V15.4189C2.79688 16.3398 3.54338 17.0863 4.46424 17.0863H16.1358C17.0566 17.0863 17.8031 16.3398 17.8031 15.4189V4.58106C17.8031 3.6602 17.0566 2.9137 16.1358 2.9137Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M6.13135 12.0884L6.8975 12.7787L8.44064 11.3898" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M11.1338 8.14841H14.4685" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M6.13135 7.92L6.8975 8.61029L8.43981 7.22137" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}