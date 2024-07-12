import { getColorStrokeClassName, getIconClassName, IconFC } from "../common";

export const UserProfileIcon: IconFC = (props) => {
    const className = getIconClassName(props, true)
    const strokeColor = getColorStrokeClassName(props.color)
    return (
        <svg className={className} width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={strokeColor} d="M11.5726 9.15188C12.3862 9.96547 12.3862 11.2846 11.5726 12.0982C10.759 12.9117 9.4399 12.9117 8.62631 12.0982C7.81272 11.2846 7.81272 9.96547 8.62631 9.15188C9.4399 8.33829 10.759 8.33829 11.5726 9.15188" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M16.1444 4.15188C16.958 4.96547 16.958 6.28456 16.1444 7.09816C15.3308 7.91175 14.0117 7.91175 13.1981 7.09816C12.3845 6.28456 12.3845 4.96547 13.1981 4.15188C14.0117 3.33829 15.3308 3.33829 16.1444 4.15188" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M15.0996 10.2084C16.3771 10.2084 17.5996 10.6525 18.4329 11.3192" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M7.00081 4.15188C7.8144 4.96547 7.8144 6.28456 7.00081 7.09816C6.18721 7.91175 4.86812 7.91175 4.05453 7.09816C3.24094 6.28456 3.24094 4.96547 4.05453 4.15188C4.86812 3.33829 6.18721 3.33829 7.00081 4.15188" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M1.76611 11.3192C2.59945 10.6525 3.82195 10.2084 5.09945 10.2084" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path className={strokeColor} d="M13.9251 16.4584C12.9543 15.7075 11.5593 15.2084 10.0993 15.2084C8.63927 15.2084 7.24427 15.7075 6.27344 16.4584" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}