import { classBuilder } from '@utils';

import { IconBoxFC } from "./common";
import styles from './styles.module.css';

export const IconBox: IconBoxFC = ({ icon, classes, size, span, color, opacity, onClick, rotation }) => {
    const className = classBuilder(
        styles,
        [{ box: true }, size, { clickable: onClick !== undefined }, opacity, rotation],
        classes
    )
    const Icon = icon;

    if (span) return <span onClick={onClick} className={className}><Icon color={color}/></span>
    
    return (
        <div onClick={onClick} className={className}>
            <Icon color={color}/>
        </div>
    )
}