import { Mapping, classJoiner } from "@utils";
import { FC } from "react";
import { PageTitleBackgroundColor, PageTitleBackgroundProps } from "./PageTitleBackground.t";
import styles from "./styles.module.css";

const GradientColorMapping = new Mapping<PageTitleBackgroundColor, string, string>(
    {
        [PageTitleBackgroundColor.Blue]: '#323AF8',
        [PageTitleBackgroundColor.LightBlue]: "#C432F8",
        [PageTitleBackgroundColor.Yellow]: '#F83232',
        [PageTitleBackgroundColor.Purple]: '#7B0DAE',
        [PageTitleBackgroundColor.Green]: '#06A31F'
    },
    '#323AF8'
);

const GradientStartOpacityMapping = new Mapping<PageTitleBackgroundColor, string, string>(
    {
        [PageTitleBackgroundColor.LightBlue]: "0.2"
    },
    '0.1'
);

export const PageTitleBackground: FC<PageTitleBackgroundProps> = ({
    color, className
}) => {
    const gradientColor = GradientColorMapping.match(color)
    const gradientStartOpacity = GradientStartOpacityMapping.match(color)

    return (
        <svg className={classJoiner(styles.background, className)} width="375" height="290" viewBox="0 0 375 290" fill="none" xmlns="http://www.w3.org/2000/svg"> 
            <g>
                <rect x="80" y="32" width="1" height="7" fill="#505760"/>
                <rect x="84" y="35" width="1" height="7" transform="rotate(90 84 35)" fill="#505760"/>
            </g>
            <g>
                <rect x="137" y="77" width="1" height="7" fill="#505760"/>
                <rect x="141" y="80" width="1" height="7" transform="rotate(90 141 80)" fill="#505760"/>
            </g>
            <g>
                <rect x="185" y="143" width="1" height="7" fill="#505760"/>
                <rect x="189" y="146" width="1" height="7" transform="rotate(90 189 146)" fill="#505760"/>
            </g>
            <g>
                <rect x="280" y="70" width="1" height="7" fill="#505760"/>
                <rect x="284" y="73" width="1" height="7" transform="rotate(90 284 73)" fill="#505760"/>
            </g>
            <g>
                <rect x="318" y="117" width="1" height="7" fill="#505760"/>
                <rect x="322" y="120" width="1" height="7" transform="rotate(90 322 120)" fill="#505760"/>
            </g>
            <g>
                <rect x="102" y="102" width="1" height="7" fill="#505760"/>
                <rect x="106" y="105" width="1" height="7" transform="rotate(90 106 105)" fill="#505760"/>
            </g>
            <g>
                <rect x="214" y="84" width="1" height="7" fill="#505760"/>
                <rect x="218" y="87" width="1" height="7" transform="rotate(90 218 87)" fill="#505760"/>
            </g>
            <g>
                <rect x="221" y="25" width="1" height="7" fill="#505760"/>
                <rect x="225" y="28" width="1" height="7" transform="rotate(90 225 28)" fill="#505760"/>
            </g>

            
            <circle opacity="0.1" cx="71.5" cy="62.5" r="6.5" fill="#D9D9D9"/>
            <circle opacity="0.1" cx="230" cy="61" r="3" fill="#D9D9D9"/>
            <circle opacity="0.1" cx="273" cy="122" r="4" fill="#D9D9D9"/>
            <circle opacity="0.1" cx="171.5" cy="92.5" r="6.5" fill="#D9D9D9"/>
            <circle opacity="0.1" cx="130" cy="91" r="3" fill="#D9D9D9"/>
            <circle opacity="0.1" cx="173" cy="62" r="4" fill="#D9D9D9"/>
            
            <rect width="468" height="580" transform="translate(-46 -290)" fill="url(#paint0_radial_339_90563)"/>
            <defs>
                <radialGradient id="paint0_radial_339_90563" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(234 358.333) rotate(-90) scale(178.333 247.992)">
                    <stop stop-color={gradientColor} stop-opacity={gradientStartOpacity}/>
                    <stop offset="0.642037" stop-color={gradientColor} stop-opacity="0"/>
                </radialGradient>
            </defs>
        </svg>
    )
}