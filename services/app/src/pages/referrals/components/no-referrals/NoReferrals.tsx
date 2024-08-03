import { HeroGood, SmallDialogueCloud } from "@assets";
import { FlexGapColumn, TextColor, TextXXSRegular } from "@utils";
import { FC } from "react";
import styles from './styles.module.css'

export const NoReferrals: FC = () => {
    return (
        <div className={FlexGapColumn.className}>
            <div className={FlexGapColumn.update({ relativePosition: true }).className}>
                <SmallDialogueCloud/>
                <p className={TextXXSRegular.update({ color: TextColor.MainBg }).withExtraClasses(styles.text)}>
                    Invite friends and<br/>
                    claim rewards for them
                </p>
            </div>
            <HeroGood width={80} height={80}/>
        </div>
    )
}