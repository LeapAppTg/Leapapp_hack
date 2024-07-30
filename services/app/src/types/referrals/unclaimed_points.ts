import { ApiTypeBuilder } from "@builders"

export type UnclaimedPointsApi = {
    count: number
}

export type UnclaimedPoints = {
    count: number
}

export const UnclaimedPointsApiTypeBuilder = new ApiTypeBuilder<UnclaimedPointsApi, UnclaimedPoints>(
    (i) => ({
        count: i.count
    })
)