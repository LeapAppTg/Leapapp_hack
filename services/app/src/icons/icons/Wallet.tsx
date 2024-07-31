import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const WalletIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M19.9951 15.5005H17.9951C16.8901 15.5005 15.9951 14.6055 15.9951 13.5005V13.5005C15.9951 12.3955 16.8901 11.5005 17.9951 11.5005H19.9951C20.5471 11.5005 20.9951 11.9485 20.9951 12.5005V14.5005C20.9951 15.0525 20.5471 15.5005 19.9951 15.5005Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M20 11.4995V8.49951C20 7.39451 19.105 6.49951 18 6.49951H4.5C3.672 6.49951 3 5.82751 3 4.99951V4.99951C3 4.17151 3.672 3.49951 4.5 3.49951H17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M20 15.4995V18.4995C20 19.6045 19.105 20.4995 18 20.4995H5C3.895 20.4995 3 19.6045 3 18.4995V4.99951" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}