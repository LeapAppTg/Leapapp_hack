import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const QuestionCircleIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={strokeColor} d="M12.0001 13.5006V12C13.1051 12 14.0009 11.1042 14.0009 9.99919C14.0009 8.89416 13.1051 7.99835 12.0001 7.99835C10.8951 7.99835 9.99927 8.89416 9.99927 9.99919" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle className={strokeColor} cx="12.0001" cy="12" r="9.00375" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M12.0002 15.9517C11.9726 15.9517 11.9502 15.974 11.9502 16.0017C11.9502 16.0293 11.9726 16.0517 12.0002 16.0517C12.0278 16.0517 12.0502 16.0293 12.0502 16.0017C12.0502 15.974 12.0278 15.9517 12.0002 15.9517" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>        
    )
}