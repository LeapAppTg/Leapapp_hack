import { PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { FC } from "react";
import { Parameters } from "./elements";

export const BoostPage: FC = () => {
    return (
        <>
        <PageTitle icon={TelegramEmojiType.Rocket} color={PageTitleBackgroundColor.Grey} title="Boost" subtitle="Improve Leap's abilities and earn more points."/>
        <Parameters/>
        </>
    )
}