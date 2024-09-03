import { ApiTypeBuilder } from "@builders"
import { ApiArrayTypeBuilder } from "../query_multiple"
import { MarketItemCategory, MarketItemCategoryApiTypeBuilder } from "."

export type MarketItemApi = {
    uuid: number,
    category: string,
    name: string,
    income: number,
    level: number,
    max_level: number,
    upgrade_price: number
}

export type MarketItem = {
    uuid: number,
    category: MarketItemCategory,
    name: string,
    income: number,
    level: number,
    maxLevel: number,
    upgradePrice: number
}

export const MarketItemApiTypeBuilder = new ApiTypeBuilder<MarketItemApi, MarketItem>(
    (i) => ({
        uuid: i.uuid,
        category: MarketItemCategoryApiTypeBuilder.convert(i.category),
        name: i.name,
        income: i.income,
        level: i.level,
        maxLevel: i.max_level,
        upgradePrice: i.upgrade_price
    })
)

export const MarketItemsListApiTypeBuilder = new ApiArrayTypeBuilder(MarketItemApiTypeBuilder)