import { Button, ButtonStyle, ContentBlock, PageTitle, PageTitleBackgroundColor, TelegramEmojiType } from "@components";
import { IconBox, IconSize, PointsIcon } from "@icons";
import { FlexGapColumn12FullWidth, FlexGapColumn16FullWidth, FlexGapRow16FullWidth, FlexGapRow4, FlexGapRow8, TextSMedium, TextXSRegular, TextXSRegularGrey400, TextXXSRegularGrey400 } from "@utils";
import { FC } from "react";
import { TableItem } from "./components";
import styles from "./styles.module.css";

export const ReferralsPage: FC = () => {

    return (
        <>
        <PageTitle icon={TelegramEmojiType.HatchingChick} color={PageTitleBackgroundColor.Blue} title="Referrals" subtitle="Invite friends and get rewards"/>
        <div className={FlexGapColumn12FullWidth.className}>
            <ContentBlock>
                <p className={TextXSRegular.className}>Claim for referrals</p>
                <Button style={ButtonStyle.Primary} fillFullWidth>
                    Claim
                    <span className={FlexGapRow4.className}>
                        <IconBox icon={PointsIcon} size={IconSize.Medium}/>
                        <p className={TextXSRegular.className}>{Number(52.12).format("default", 2)}</p>
                    </span>
                </Button>
                <div className={FlexGapRow8.className}>
                    <p className={TextXXSRegularGrey400.className}>Total claimed from referrals:</p>
                    <div className={FlexGapRow4.className}>
                        <IconBox icon={PointsIcon} size={IconSize.Medium}/>
                        <p className={TextXSRegular.className}>{Number(52990.1).format("default", 2)}</p>
                    </div>
                </div>
            </ContentBlock>
            <ContentBlock>
                <p className={TextXSRegularGrey400.update({ cropText: true }).className}>t.me/LeapAppBot/app?startapp=ref_IicAGiU1Jq</p>
                <div className={FlexGapRow16FullWidth.className}>
                    <Button style={ButtonStyle.Tertiary} fillFullWidth>
                        Copy
                    </Button>
                    <Button style={ButtonStyle.Secondary} fillFullWidth>
                        Share
                    </Button>
                </div>
            </ContentBlock>
            <div className={FlexGapColumn16FullWidth.className}>
                <div className={styles.table_title}>
                    <p className={TextSMedium.className}>Referrals</p>
                    <div className={FlexGapRow4.className}>
                        <p className={TextXSRegularGrey400.className}>Total:</p>
                        <p className={TextXSRegular.className}>190</p>
                    </div>
                </div>
            </div>
            <div className={styles.table}>
                <TableItem/>
                <TableItem/>
                <TableItem/>
                <TableItem/>
                <TableItem/>
                <TableItem/>
                <TableItem/>
                <TableItem/>
                <TableItem/>
            </div>
        </div>
        </>
    )
}