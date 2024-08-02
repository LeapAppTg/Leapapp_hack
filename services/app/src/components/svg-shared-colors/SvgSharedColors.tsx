import { FC } from "react"

const Gradients: FC = () => {
    return (
        <defs>
            <linearGradient id="color-metal-gold-2" x1="0.0846545" y1="24.9921" x2="43.9016" y2="24.9921" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FFFCA8"/>
                <stop offset="0.3123" stop-color="#FDB836"/>
                <stop offset="0.7592" stop-color="#FDC966"/>
                <stop offset="1" stop-color="#F1DC83"/>
            </linearGradient>
        </defs>
    )
}

export const SvgSharedColors: FC = () => {
    return (
        <svg style={{
            'position': 'absolute',
            'width': '0',
            'height': '0',
            'zIndex': '-999'
        }}>
            <Gradients/>
        </svg>
    )
}