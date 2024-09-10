import { PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { FC } from "react";
import { ClaimButton, Stats } from "./components";
import { Table, InviteButton } from "./elements";
import styles from "./styles.module.css"
import { FlexGapColumn12FullWidth } from "@utils";

export const ReferralsPage: FC = () => {

    return (
        <>
        <div className={FlexGapColumn12FullWidth.className}>
            <PageTitle icon={TelegramEmojiType.ChampangeGlasses} color={PageTitleBackgroundColor.Blue} title="Referrals" subtitle="Earn 10% from frens + 3% from their referrals. Get a game ticket for each fren"/>
            <Stats/>
            <ClaimButton/>
        </div>
        <Table/>
        <InviteButton/>
        </>
    )
}