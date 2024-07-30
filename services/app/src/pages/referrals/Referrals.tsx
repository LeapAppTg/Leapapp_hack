import { PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { FC } from "react";
import { ClaimButton } from "./components";
import { Table, InviteButton } from "./elements";

export const ReferralsPage: FC = () => {

    return (
        <>
        <PageTitle icon={TelegramEmojiType.ChampangeGlasses} color={PageTitleBackgroundColor.Blue} title="Referrals" subtitle="Earn 10% from frens + 3% from their referrals. Get a game ticket for each fren"/>
        <ClaimButton/>
        <Table/>
        <InviteButton/>
        </>
    )
}