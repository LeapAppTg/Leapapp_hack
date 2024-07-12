import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const DragNDropIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path className={strokeColor} d="M21 10.5C20.1716 10.5 19.5 9.82843 19.5 9C19.5 8.17157 20.1716 7.5 21 7.5C21.8284 7.5 22.5 8.17157 22.5 9C22.5 9.82843 21.8284 10.5 21 10.5Z"/>
            <path className={strokeColor} d="M15 10.5C14.1716 10.5 13.5 9.82843 13.5 9C13.5 8.17157 14.1716 7.5 15 7.5C15.8284 7.5 16.5 8.17157 16.5 9C16.5 9.82843 15.8284 10.5 15 10.5Z"/>
            <path className={strokeColor} d="M9 10.5C8.17157 10.5 7.5 9.82843 7.5 9C7.5 8.17157 8.17157 7.5 9 7.5C9.82843 7.5 10.5 8.17157 10.5 9C10.5 9.82843 9.82843 10.5 9 10.5Z"/>
            <path className={strokeColor} d="M3 10.5C2.17157 10.5 1.5 9.82843 1.5 9C1.5 8.17157 2.17157 7.5 3 7.5C3.82843 7.5 4.5 8.17157 4.5 9C4.5 9.82843 3.82843 10.5 3 10.5Z"/>
            <path className={strokeColor} d="M21 16.5C20.1716 16.5 19.5 15.8284 19.5 15C19.5 14.1716 20.1716 13.5 21 13.5C21.8284 13.5 22.5 14.1716 22.5 15C22.5 15.8284 21.8284 16.5 21 16.5Z"/>
            <path className={strokeColor} d="M15 16.5C14.1716 16.5 13.5 15.8284 13.5 15C13.5 14.1716 14.1716 13.5 15 13.5C15.8284 13.5 16.5 14.1716 16.5 15C16.5 15.8284 15.8284 16.5 15 16.5Z"/>
            <path className={strokeColor} d="M9 16.5C8.17157 16.5 7.5 15.8284 7.5 15C7.5 14.1716 8.17157 13.5 9 13.5C9.82843 13.5 10.5 14.1716 10.5 15C10.5 15.8284 9.82843 16.5 9 16.5Z"/>
            <path className={strokeColor} d="M3 16.5C2.17157 16.5 1.5 15.8284 1.5 15C1.5 14.1716 2.17157 13.5 3 13.5C3.82843 13.5 4.5 14.1716 4.5 15C4.5 15.8284 3.82843 16.5 3 16.5Z"/>
        </svg>
    )
}