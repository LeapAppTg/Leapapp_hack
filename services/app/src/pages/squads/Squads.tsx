import { ComingSoon, PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { FC } from "react";

export const SquadsPage: FC = () => {
    return (
        <>
        <PageTitle icon={TelegramEmojiType.RollerCoaster} color={PageTitleBackgroundColor.Green} title="Squads" subtitle="Join squads and compete with others"/>
        <ComingSoon inTime={1723766400000}/>
        </>
    )
}