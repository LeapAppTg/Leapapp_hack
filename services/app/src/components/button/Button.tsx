import { IconColor } from "@icons";
import { MultiMapping, TextColor, TextXSRegular, classBuilder } from "@utils";
import { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ButtonProps, ButtonStyle } from "./Button.t";
import styles from './styles.module.css';

const ColorMapping = new MultiMapping<ButtonStyle, [[TextColor, undefined], [IconColor, undefined]]>(
    [{ [ButtonStyle.Link]: TextColor.Purple400 }, undefined],
    [{ [ButtonStyle.Link]: IconColor.Purple400 }, undefined]
);

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ linkTo, ...restProps }) => {
    if (linkTo) return (
        <Link to={linkTo} target="_blank">
            <ButtonContent {...restProps}/>
        </Link>
    )

    return <ButtonContent {...restProps}/>
}

const ButtonContent: FC<PropsWithChildren<ButtonProps>> = ({
    style, disabled, onClick, children, fillFullWidth
}) => {

    const className = classBuilder(
        styles,
        [style, { disabled }, { fill_full_width: fillFullWidth }], 
        TextXSRegular.update({ color: ColorMapping.match(style)[0] }).className
    )

    return (
        <button className={className} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    )
}