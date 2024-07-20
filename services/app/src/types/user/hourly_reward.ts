import { ApiTypeBuilder } from "@builders"

export type HourlyRewardApi = {
    game_tickets: number,
    points: number,
    next_claim_time: number,
    can_claim: boolean
}

export type HourlyReward = {
    gameTickets: number,
    points: number,
    nextClaimTime: number,
    canClaim: boolean
}

export const HourlyRewardApiTypeBuilder = new ApiTypeBuilder<HourlyRewardApi, HourlyReward>(
    (i) => ({
        canClaim: i.can_claim,
        gameTickets: i.game_tickets,
        nextClaimTime: i.next_claim_time,
        points: i.points
    })
)