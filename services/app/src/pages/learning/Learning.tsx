import { ComingSoon, PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { FC } from "react";

export const LearningPage: FC = () => {
    return (
        <>
        <PageTitle icon={TelegramEmojiType.Books} color={PageTitleBackgroundColor.Blue} title="Learning" subtitle="Explore crypto and earn rewards"/>
        <ComingSoon inTime={1723420800000}/>
        </>
    )
}