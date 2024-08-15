import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const ColorPaletteIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path className={strokeColor} d="M10.6992 5.3125C10.5725 5.3125 10.47 5.415 10.4717 5.54167C10.4717 5.66833 10.5742 5.77083 10.7009 5.77083C10.8275 5.77083 10.93 5.66833 10.93 5.54167C10.9284 5.415 10.8267 5.3125 10.6992 5.3125" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M6.47061 9.99899C6.47061 9.87233 6.36811 9.76983 6.24228 9.77149C6.11561 9.77149 6.01311 9.87399 6.01311 10.0007C6.01311 10.1273 6.11561 10.2298 6.24228 10.2298C6.36895 10.2298 6.47061 10.1265 6.47061 9.99899" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M14.0141 6.6852C13.9249 6.59603 13.7799 6.59603 13.6916 6.68603C13.6024 6.7752 13.6024 6.9202 13.6916 7.00936C13.7807 7.09853 13.9257 7.09853 14.0149 7.00936C14.1041 6.91936 14.1041 6.7752 14.0141 6.6852" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M7.70841 12.9909C7.61924 12.9017 7.47424 12.9017 7.38591 12.9917C7.29674 13.0809 7.29674 13.2259 7.38591 13.315C7.47508 13.4042 7.62008 13.4042 7.70924 13.315C7.79841 13.2259 7.79841 13.0809 7.70841 12.9909" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M7.70966 7.00822C7.79883 6.91905 7.79883 6.77405 7.70883 6.68572C7.61966 6.59655 7.47466 6.59655 7.38549 6.68572C7.29633 6.77488 7.29633 6.91988 7.38549 7.00905C7.47466 7.09822 7.61966 7.09822 7.70966 7.00822" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M10.6998 17.5001C6.48732 17.5001 3.08565 14.0268 3.20315 9.78761C3.31148 5.87428 6.57398 2.61178 10.4873 2.50344C14.7265 2.38594 18.1998 5.78761 18.1998 10.0001V10.8334C18.1998 11.7543 17.454 12.5001 16.5332 12.5001H14.814C13.7065 12.5001 12.9073 13.5601 13.2115 14.6243L13.4257 15.3751C13.7307 16.4401 12.9307 17.5001 11.824 17.5001H10.6998Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}