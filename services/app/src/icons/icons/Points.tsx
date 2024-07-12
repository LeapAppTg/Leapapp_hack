import { getIconClassName, IconFC } from "../common";

export const PointsIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" fill="none">
            <g filter="url(#filter0_d_524_14124)">
                <path d="M7.35745 3.25733H4.78602C3.93392 3.25733 3.24316 3.94809 3.24316 4.80019V14.5716C3.24316 15.4237 3.93392 16.1145 4.78602 16.1145H7.10031C7.9524 16.1145 8.64316 16.8052 8.64316 17.6573L8.64316 19.9716C8.64316 20.8237 9.33392 21.5145 10.186 21.5145H19.7003C20.5524 21.5145 21.2432 20.8237 21.2432 19.9716V17.4002C21.2432 16.5481 20.5524 15.8573 19.7003 15.8573H10.4432C9.59107 15.8573 8.90031 15.1666 8.90031 14.3145V4.80019C8.90031 3.94809 8.20955 3.25733 7.35745 3.25733Z" fill="#EEEEEE"/>
                <path d="M19.7002 3.25732C20.5523 3.25732 21.2431 3.94809 21.2431 4.80018V7.8859C21.2431 8.73799 20.5523 9.42875 19.7002 9.42875H16.6145C15.7624 9.42875 15.0717 8.73799 15.0717 7.8859V4.80018C15.0717 3.94808 15.7624 3.25732 16.6145 3.25732L19.7002 3.25732Z" fill="#EEEEEE"/>
            </g>
            <defs>
                <filter id="filter0_d_524_14124" x="3.24316" y="3.25732" width="19" height="19.2573" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dx="1" dy="1"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0.709804 0 0 0 0 0.109804 0 0 0 0 0.968627 0 0 0 1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_524_14124"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_524_14124" result="shape"/>
                </filter>
            </defs>
        </svg>
    )
}