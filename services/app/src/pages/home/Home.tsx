import { FC } from "react";
import styles from "./styles.module.css";
import { FrogIcon, IconBox, IconSize, PointsIcon } from "@icons";
import { TextMSemiBold, TextXSMedium, TextXSRegular } from "@utils";
import { Button, ButtonStyle, ContentBlock } from "@components";
import { GamePreview } from "./components";

export const HomePage: FC = () => {
    return (
        <>
        <div className={styles.stats_wrapper}>
            <div className={styles.stat}>
                <IconBox icon={PointsIcon} size={IconSize.MediumBig}/>
                <p className={TextMSemiBold.className}>{Number(9696223).format()}</p>
            </div>
            <div className={styles.stat}>
                <IconBox icon={FrogIcon} size={IconSize.MediumBig}/>
                <p className={TextMSemiBold.className}>{Number(1).format()}</p>
            </div>
        </div>
        <GamePreview/>
        <ContentBlock>
            <p className={TextMSemiBold.className}>Farming</p>
            <div className={styles.farming_stats}>
                <div className={styles.farming_stat}>
                    <p className={TextXSRegular.className}>$LEAP:</p>
                    <IconBox icon={PointsIcon} size={IconSize.Medium}/>
                    <p className={TextXSMedium.className}>99</p>
                </div>
                <div className={styles.farming_stat}>
                    <p className={TextXSRegular.className}>Games:</p>
                    <IconBox icon={FrogIcon} size={IconSize.Medium}/>
                    <p className={TextXSMedium.className}>4</p>
                </div>
            </div>
            <Button style={ButtonStyle.Primary} fillFullWidth>
                Claim
            </Button>
        </ContentBlock>
        </>
    )
}