import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const BookOpenIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={strokeColor} d="M13 11.4642C13.8008 11.1983 14.6217 11.0292 15.5 10.9308" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M5.5 10.9316C6.37833 11.0291 7.19917 11.1991 8 11.4649" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M15.5 7.5983C14.6217 7.6958 13.8008 7.8658 13 8.13164" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M8 8.13084C7.19917 7.86501 6.37833 7.69584 5.5 7.59751" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M10.5 5.10915C8.33833 3.89831 6.40667 3.41665 3.8475 3.33415C3.3825 3.31831 3 3.70165 3 4.16748V14.045C3 14.4958 3.36083 14.87 3.81167 14.8766C6.38833 14.915 8.32833 15.39 10.5 16.6666C12.6717 15.39 14.6117 14.915 17.1883 14.8766C17.6392 14.87 18 14.4958 18 14.0441V4.16665C18 3.70081 17.6175 3.31831 17.1525 3.33331C14.5933 3.41665 12.6617 3.89831 10.5 5.10915Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M10.5002 5.10834V16.6667" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}