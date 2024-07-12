import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const PackageBoxHomeIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={strokeColor} id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M2.99805 15.002V15.002C2.99805 16.3833 4.1178 17.503 5.49909 17.503H15.5033C16.8845 17.503 18.0043 16.3833 18.0043 15.002V15.002V8.88779C18.0038 8.11662 17.6476 7.3888 17.0389 6.9153L12.0368 3.02451C11.1336 2.32191 9.86874 2.32191 8.96553 3.02451L3.96345 6.9153C3.35476 7.3888 2.99854 8.11662 2.99805 8.88779V15.002Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}