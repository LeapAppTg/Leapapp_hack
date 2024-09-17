import { ComingSoon, PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { FC } from "react";

export const CustomizePage: FC = () => {
    return (
        <>
        <PageTitle icon={TelegramEmojiType.ColorPalette} color={PageTitleBackgroundColor.Grey} title="Customize" subtitle="Make your Leap unique"/>
        <ComingSoon/>
        </>
    )
}