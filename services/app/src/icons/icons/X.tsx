import { getIconClassName, IconFC } from "../common";

export const XIcon: IconFC = (props) => {
    const className = getIconClassName(props)
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M2.04901 3L9.80777 13.4057L2 21.8635H3.7582L10.5919 14.4564L16.1146 21.8635H22.0938L13.9 10.8741L21.1656 3H19.4105L13.1159 9.82036L8.03119 3H2.04901ZM4.63424 4.29648H7.38182L19.5116 20.564H16.764L4.63424 4.29648Z"/>
        </svg>
    )
}