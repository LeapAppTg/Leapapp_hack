import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const SubstractGroupIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path className={strokeColor} d="M11.9271 15.3701C12.605 16.048 12.605 17.1471 11.9271 17.825C11.2492 18.5028 10.1502 18.5028 9.47228 17.825C8.7944 17.1471 8.7944 16.048 9.47228 15.3701C10.1502 14.6922 11.2492 14.6922 11.9271 15.3701" stroke-width="1.5"/>
            <path className={strokeColor} d="M11.9271 15.3701C12.605 16.048 12.605 17.1471 11.9271 17.825C11.2492 18.5028 10.1502 18.5028 9.47228 17.825C8.7944 17.1471 8.7944 16.048 9.47228 15.3701C10.1502 14.6922 11.2492 14.6922 11.9271 15.3701" stroke-width="1.5"/>
            <path className={strokeColor} d="M11.9271 2.1751C12.605 2.85299 12.605 3.95205 11.9271 4.62994C11.2492 5.30783 10.1502 5.30783 9.47228 4.62994C8.7944 3.95206 8.7944 2.85299 9.47228 2.1751C10.1502 1.49722 11.2492 1.49722 11.9271 2.1751" stroke-width="1.5"/>
            <path className={strokeColor} d="M5.32947 8.77257C6.00735 9.45046 6.00735 10.5495 5.32947 11.2274C4.65158 11.9053 3.55252 11.9053 2.87462 11.2274C2.19674 10.5495 2.19674 9.45047 2.87462 8.77257C3.55251 8.09469 4.65157 8.09469 5.32947 8.77257" stroke-width="1.5"/>
            <path className={strokeColor} d="M18.5248 8.77257C19.2027 9.45046 19.2027 10.5495 18.5248 11.2274C17.8469 11.9053 16.7478 11.9053 16.0699 11.2274C15.3921 10.5495 15.3921 9.45047 16.0699 8.77257C16.7478 8.09469 17.8469 8.09469 18.5248 8.77257" stroke-width="1.5"/>
            <path className={strokeColor} d="M16.0339 6.3325C15.5847 5.68 15.0197 5.115 14.3672 4.66583" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M5.36572 13.6675C5.81489 14.32 6.37989 14.885 7.03239 15.3341" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M7.03239 4.66583C6.37989 5.115 5.81489 5.68 5.36572 6.3325" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M14.3672 15.3341C15.0197 14.885 15.5847 14.32 16.0339 13.6675" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}