import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const ShopIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path className={strokeColor} d="M4.41667 9.07501V17.4083" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M17.3835 9.07501V17.4083" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M12.7517 17.4075V13.7041C12.7517 12.6816 11.9225 11.8525 10.9 11.8525C9.87751 11.8525 9.04834 12.6816 9.04834 13.7041V17.4075" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M2.56641 17.4083H19.2331" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M4.48405 9.0742C3.06905 9.0642 2.14655 7.66336 2.75988 6.45586L4.18905 3.6417C4.51488 3.00003 5.19988 2.59253 5.95155 2.59253H15.8482C16.5999 2.59253 17.2849 3.00003 17.6107 3.6417L19.0407 6.45586C19.654 7.66336 18.7315 9.0642 17.3165 9.0742C16.1357 9.0742 15.1782 8.26753 15.1782 7.2717V7.2317C15.1782 8.2492 14.2207 9.0742 13.0399 9.0742C11.859 9.0742 10.9015 8.2492 10.9015 7.2317C10.9015 8.2492 9.94405 9.0742 8.76322 9.0742C7.58238 9.0742 6.62488 8.2492 6.62488 7.2317V7.2717C6.62238 8.26753 5.66488 9.0742 4.48405 9.0742Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}