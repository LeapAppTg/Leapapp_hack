import { PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { FC } from "react";
import { ClaimButton, Stats } from "./components";
import { InviteButton, Milestones } from "./elements";
import { FlexGapColumn12FullWidth } from "@utils";

export const ReferralsPage: FC = () => {

    return (
        <>
        <div className={FlexGapColumn12FullWidth.className}>
            <PageTitle icon={TelegramEmojiType.ChampangeGlasses} color={PageTitleBackgroundColor.Blue} title="Referrals" subtitle="Earn 10% from frens earnings"/>
            <Stats/>
            <ClaimButton/>
        </div>
        <Milestones/>
        <InviteButton/>
        </>
    )
}