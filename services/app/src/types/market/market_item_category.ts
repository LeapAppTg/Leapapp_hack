import { ApiTypeBuilder } from "@builders"

export enum MarketItemCategory {
    HourlyRewardUpgrade = 'hourly_reward_upgrade'
}

const MarketItemCategoryMapping: Record<string, MarketItemCategory> = {
    'hours_reward_upgrade': MarketItemCategory.HourlyRewardUpgrade
}

export const MarketItemCategoryApiTypeBuilder = new ApiTypeBuilder<string, MarketItemCategory, false>(
    (i) => {
        return MarketItemCategoryMapping[i] || MarketItemCategory.HourlyRewardUpgrade
    }
)