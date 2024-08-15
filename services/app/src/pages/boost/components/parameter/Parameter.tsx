import { AlertStatus, Button, ButtonStyle, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { AlignItems, EnumMatcher, FlexGapColumn4AlignFlexStart, FlexGapColumn8FullWidth, FlexGapRow10FullWidth, FlexGapRow12, FlexGapRow4, FlexGapRow8, FlexGapRow8FullWidth, TextColor, TextXSMedium, TextXXSRegular, TextXXSRegularGrey400 } from "@utils";
import { FC } from "react";
import styles from "./styles.module.css";
import { Coin } from "@assets";
import { MarketItem } from "@types";
import { useAlerts, useAuth } from "@providers";
import { postUpgradeMarketItem } from "@services";

const IconMapping = new EnumMatcher<string, TelegramEmojiType, TelegramEmojiType.Arm>(
    {
        "Intelligence": TelegramEmojiType.Nerd,
        "Endurance": TelegramEmojiType.Leg,
        "Strength": TelegramEmojiType.Arm,
        "Agility": TelegramEmojiType.Dance
    },
    TelegramEmojiType.Arm
)

export const Parameter: FC<MarketItem & { upgradeCallback: () => any }> = ({
    uuid, upgradePrice, name, level, maxLevel, description, upgradeCallback
}) => {

    const { authToken } = useAuth()
    const { sendAlert, sendApiErrorAlert } = useAlerts()

    async function onUpgrade () {
        try {
            await postUpgradeMarketItem(authToken, uuid)
            sendAlert({
                status: AlertStatus.Success,
                message: `${name} was upgraded`
            })
            upgradeCallback()
        } catch (e) {
            sendApiErrorAlert(e)
        }
    }

    return (
        <div className={FlexGapRow8FullWidth.withExtraClasses(styles[`level_${level}`])}>
            <div className={FlexGapColumn8FullWidth.update({ alignItems: AlignItems.FlexStart }).className}>
                <div className={FlexGapRow12.className}>
                    <div className={styles.icon}>
                        <TelegramEmoji size={TelegramEmojiSize.Submedium} type={IconMapping.match(name)}/>
                    </div>
                    <div className={FlexGapColumn4AlignFlexStart.className}>
                        <div className={FlexGapRow8.className}>
                            <p className={TextXSMedium.className}>
                                {name}
                            </p>
                            <div className={styles.dot}/>
                            <p className={TextXXSRegular.update({ color: TextColor.Grey500 }).className}>
                                {level.format()} lvl
                            </p>
                        </div>
                        <p className={TextXXSRegularGrey400.className}>
                            {description}
                        </p>
                    </div>
                </div>
                <div className={FlexGapRow10FullWidth.className}>
                    <div className={styles.progress}>
                        <div style={{ width: `${100 * level / maxLevel}%` }}/>
                    </div>
                    <p className={TextXXSRegular.className}>
                        {level.format()}/{maxLevel.format()}
                    </p>
                </div>
            </div>
            {
                level !== maxLevel
                ?
                <Button style={ButtonStyle.Tertiary} fillFullHeight className={styles.button} onClick={onUpgrade}>
                    Boost
                    <span className={FlexGapRow4.className}>
                        <Coin width={20} height={20}/>
                        {upgradePrice.format()}
                    </span>
                </Button>
                :
                null
            }
        </div>
    )
}