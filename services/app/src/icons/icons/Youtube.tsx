import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const YoutubeIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M21.583 6.37287C21.354 5.36887 20.676 4.57687 19.814 4.30487C18.255 3.81787 12 3.81787 12 3.81787C12 3.81787 5.748 3.81787 4.186 4.30487C3.327 4.57287 2.649 5.36487 2.417 6.37287C2 8.19487 2 11.9999 2 11.9999C2 11.9999 2 15.8049 2.417 17.6269C2.646 18.6309 3.324 19.4229 4.186 19.6949C5.748 20.1819 12 20.1819 12 20.1819C12 20.1819 18.255 20.1819 19.814 19.6949C20.673 19.4269 21.351 18.6349 21.583 17.6269C22 15.8049 22 11.9999 22 11.9999C22 11.9999 22 8.19487 21.583 6.37287Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M10.002 15L15.198 12L10.002 9V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}