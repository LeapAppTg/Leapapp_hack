import { IconBox, IconColor, IconSize } from "@icons";
import { MultiMapping, TextColor, TextXSRegular, classBuilder } from "@utils";
import React, { FC, PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { ButtonProps, ButtonStyle } from "./Button.t";
import styles from './styles.module.css';
import { useTelegram } from "@providers";

const ColorMapping = new MultiMapping<ButtonStyle, [[TextColor, undefined], [IconColor, undefined]]>(
    [{ [ButtonStyle.Link]: TextColor.Purple400 }, undefined],
    [{ [ButtonStyle.Link]: IconColor.Purple400 }, undefined]
);

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ linkTo, ...restProps }) => {
    if (linkTo) return (
        <Link to={linkTo} className={restProps.fillFullWidth ? styles.fill_full_width : undefined}>
            <ButtonContent {...restProps}/>
        </Link>
    )

    return <ButtonContent {...restProps}/>
}

const ButtonContent: FC<PropsWithChildren<ButtonProps>> = ({
    style, disabled, onClick, children, fillFullWidth, rightIcon, fillFullHeight, className: extraClasses, id
}) => {

    const { triggerHapticFeedback } = useTelegram()

    function click (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (!onClick) return
        triggerHapticFeedback({ type: 'impact', impact_style: 'soft' })
        onClick(e)
    }

    const className = classBuilder(
        styles,
        [style, { disabled }, { fill_full_width: fillFullWidth }, { fill_full_height: fillFullHeight }],
        TextXSRegular.update({ color: ColorMapping.match(style)[0] }).className,
        extraClasses
    )

    return (
        <button className={className} disabled={disabled} onClick={click} id={id}>
            {children}
            {
                rightIcon
                ?
                <IconBox size={IconSize.MediumBig} icon={rightIcon} color={ColorMapping.match(style)[1]} span/>
                :
                null
            }
        </button>
    )
}