import { PageTitleBackground, TelegramEmoji, TelegramEmojiSize } from "@components";
import { FlexGapColumn16FullWidth, TextColor, TextLineHeight, TextSize, TextStyleBuilder, TextWeight } from "@utils";
import { FC } from "react";
import { PageTitleProps } from "./PageTitle.t";

export const PageTitle: FC<PageTitleProps> = ({
    icon, subtitle, title, color
}) => {
    return (
        <div className={FlexGapColumn16FullWidth.update({ relativePosition: true }).className}>
            {
                icon
                ?
                <TelegramEmoji type={icon} size={TelegramEmojiSize.Large}/>
                :
                null
            }
            <h1 className={new TextStyleBuilder({ color: TextColor.MainWhite, size: TextSize.Medium, weight: TextWeight.SemiBold, lineHeight: TextLineHeight.Medium }).className}>{title}</h1>
            {
                subtitle
                ?
                <h3 className={new TextStyleBuilder({ color: TextColor.Grey400, size: TextSize.XSmall, lineHeight: TextLineHeight.Large }).className}>{subtitle}</h3>
                :
                null
            }
            <PageTitleBackground color={color}/>
        </div>
    )
}