import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const SpaceRocketIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M14.348 10.1026L9.84879 13.702C9.51708 13.9673 9.03887 13.9409 8.73849 13.6405L6.45903 11.361C6.15865 11.0606 6.13216 10.5824 6.39754 10.2507L9.99687 5.75155C11.6427 3.69421 14.1346 2.49658 16.7692 2.49658V2.49658C17.2297 2.49658 17.6029 2.86983 17.6029 3.33026V3.33026C17.6029 5.96494 16.4053 8.45677 14.348 10.1026Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M13.435 10.8335V14.4867C13.435 14.8025 13.2566 15.0911 12.9742 15.2323L10.96 16.2394C10.7439 16.3475 10.4915 16.3565 10.2682 16.264C10.0449 16.1715 9.87274 15.9867 9.79631 15.7574L9.2666 14.1682" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M5.93164 10.8334L4.34251 10.3037C4.11323 10.2273 3.92841 10.0551 3.83592 9.83187C3.74344 9.60859 3.75239 9.35616 3.86047 9.14L4.86756 7.12589C5.00877 6.84347 5.29741 6.66504 5.61317 6.66504H9.26636" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} fill-rule="evenodd" clip-rule="evenodd" d="M4.88938 17.1586L2.59668 17.503L2.94111 15.2103C3.05285 14.4666 3.6367 13.8827 4.38046 13.771V13.771C4.91791 13.6902 5.4618 13.8693 5.84611 14.2536C6.23042 14.6379 6.40953 15.1818 6.32877 15.7193V15.7193C6.21701 16.4631 5.63314 17.0469 4.88938 17.1586V17.1586Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}