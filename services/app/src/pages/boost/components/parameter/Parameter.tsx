import { AlertStatus, Button, ButtonStyle, TelegramEmoji, TelegramEmojiSize, TelegramEmojiType } from "@components";
import { AlignItems, EnumMatcher, FlexGapColumn4AlignFlexStart, FlexGapColumn8FullWidth, FlexGapRow10FullWidth, FlexGapRow12, FlexGapRow4, FlexGapRow8, FlexGapRow8FullWidth, TextColor, TextLineHeight, TextSize, TextStyleBuilder, TextXSMedium, TextXXSRegular, TextXXSRegularGrey400, TextXXXSRegularGrey400, classJoiner } from "@utils";
import { FC, useMemo } from "react";
import styles from "./styles.module.css";
import { Coin } from "@assets";
import { MarketItem, MarketItemCategory } from "@types";
import { useAlerts, useAuth } from "@providers";
import { postUpgradeMarketItem } from "@services";
import { ApiRoutes, useData } from "@hooks";
import mixpanel from "mixpanel-browser";

const IconMapping = new EnumMatcher<string, TelegramEmojiType, TelegramEmojiType.Eye>(
    {
        "Observability": TelegramEmojiType.Eye,
        "Pleasure": TelegramEmojiType.Candy,
        "Ease": TelegramEmojiType.Butterfly,
        "Partying": TelegramEmojiType.PartyBall
    },
    TelegramEmojiType.Eye
)

const DescriptionMapping = new EnumMatcher<MarketItemCategory, string, string>(
    {
        [MarketItemCategory.HourlyRewardUpgrade]: 'to hourly claim'
    },
    'to hourly claim'
)

export const Parameter: FC<MarketItem & { upgradeCallback: () => any }> = ({
    uuid, upgradePrice, name, level, maxLevel, income, upgradeCallback, category
}) => {

    const { authToken } = useAuth()
    const { sendAlert, sendApiErrorAlert } = useAlerts()
    const { data: user, mutate } = useData(ApiRoutes.GetUserProfile)

    const canUpgrade = useMemo(() => {
        if (!user) return false
        if (user.points < upgradePrice) return false
        return true
    }, [user, upgradePrice])

    async function onUpgrade () {
        try {
            await postUpgradeMarketItem(authToken, uuid)
            sendAlert({
                status: AlertStatus.Success,
                message: `${name} was upgraded`
            })
            mixpanel.track(
                "upgrade_boost",
                {
                    "boost": name,
                    "price": upgradePrice,
                    "new_level": level + 1
                }
            )
            upgradeCallback()
            mutate(prev => prev ? { ...prev, points: prev.points - upgradePrice } : undefined)
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
                            + {income.format()} {DescriptionMapping.match(category)}
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
                canUpgrade
                ?
                <Button style={ButtonStyle.Tertiary} fillFullHeight className={styles.button} onClick={onUpgrade}>
                    Boost
                    <span className={FlexGapRow4.className}>
                        <Coin width={20} height={20}/>
                        {upgradePrice.format()}
                    </span>
                </Button>
                :
                <Button style={ButtonStyle.Tertiary} fillFullHeight className={classJoiner(styles.button, styles.disabled)} disabled>
                    <span className={TextXXXSRegularGrey400.className}>
                        Not enough<br/>coins
                    </span>
                    <span className={FlexGapRow4.className}>
                        <Coin width={20} height={20}/>
                        <span className={TextXXSRegular.className}>
                            {upgradePrice.format()}
                        </span>
                    </span>
                </Button>
                :
                null
            }
        </div>
    )
}