import { ApiTypeBuilder } from "@builders"
import { ApiArrayTypeBuilder } from "../query_multiple"

export type MarketItemApi = {
    uuid: number,
    category: string,
    name: string,
    description: string,
    level: number,
    max_level: number,
    upgrade_price: number
}

export type MarketItem = {
    uuid: number,
    category: string,
    name: string,
    description: string,
    level: number,
    maxLevel: number,
    upgradePrice: number
}

export const MarketItemApiTypeBuilder = new ApiTypeBuilder<MarketItemApi, MarketItem>(
    (i) => ({
        uuid: i.uuid,
        category: i.category,
        name: i.name,
        description: i.description,
        level: i.level,
        maxLevel: i.max_level,
        upgradePrice: i.upgrade_price
    })
)

export const MarketItemsListApiTypeBuilder = new ApiArrayTypeBuilder(MarketItemApiTypeBuilder)