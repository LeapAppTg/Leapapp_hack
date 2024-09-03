import { BronzeBadge, Coin, GoldBadge, SilverBadge } from "@assets";
import { GameLeaderboardMember } from "@types";
import { FlexGapRow4, FlexGapRow8FullWidthJustifySpaceBetween, FlexGapRowFullWidthJustifyFlexStart, TextAlign, TextXSMedium, TextXSRegular, TextXSRegularGrey400 } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";

type TableItemProps = GameLeaderboardMember & { place: number }

export const TableItem: FC<TableItemProps> = ({
    place, record, firstName, lastName
}) => {
    return (
        <div className={FlexGapRow8FullWidthJustifySpaceBetween.className}>
            <div className={styles.place_wrapper}>
                {
                    place === 1
                    ?
                    <GoldBadge width={24} height={24}/>
                    :
                    place === 2
                    ?
                    <SilverBadge width={24} height={24}/>
                    :
                    place === 3
                    ?
                    <BronzeBadge width={24} height={24}/>
                    :
                    <p className={TextXSRegularGrey400.className}>
                        {place.format()}
                    </p>
                }
            </div>
            <div className={FlexGapRowFullWidthJustifyFlexStart.update({ hideOverflow: true }).className}>
                <p className={TextXSMedium.update({ cropText: true, textAlign: TextAlign.Left }).className}>  
                    {firstName} {lastName}
                </p>
            </div>
            <div className={FlexGapRow4.className}>
                <p className={TextXSRegular.update({ cropText: true }).className}>
                    {record.format()}
                </p>
                <Coin width={20} height={20}/>
            </div>
        </div>
    )
}