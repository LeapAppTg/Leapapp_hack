import { PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { FC } from "react";
import { Table } from "./elements";

export const LeaderboardPage: FC = () => {
    return (
        <>
        <PageTitle icon={TelegramEmojiType.Cup} color={PageTitleBackgroundColor.Purple} title="All-time game leaderboard"/>
        <Table/>
        </>
    )
}