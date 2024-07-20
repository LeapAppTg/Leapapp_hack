import { ApiTypeBuilder } from "@builders"

export type DailyRewardApi = {
    game_tickets: number,
    points: number,
    xDays: number,
    next_claim_time: number,
    can_claim: boolean
}

export type DailyReward = {
    gameTickets: number,
    points: number,
    days: number,
    nextClaimTime: number,
    canClaim: boolean
}

export const DailyRewardApiTypeBuilder = new ApiTypeBuilder<DailyRewardApi, DailyReward>(
    (i) => ({
        canClaim: i.can_claim,
        days: i.xDays,
        gameTickets: i.game_tickets,
        nextClaimTime: i.next_claim_time,
        points: i.points
    })
)