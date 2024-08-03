import { ApiTypeBuilder } from "@builders"
import { ApiArrayTypeBuilder } from "../query_multiple"

export type GameLeaderboardMemberApi = {
    username: string,
    game_records: number
}

export type GameLeaderboardMember = {
    username: string,
    record: number
}

export const GameLeaderboardMemberApiTypeBuilder = new ApiTypeBuilder<GameLeaderboardMemberApi, GameLeaderboardMember>(
    (i) => ({
        username: i.username,
        record: i.game_records
    })
)

export const GameLeaderboardApiTypeBuilder = new ApiArrayTypeBuilder(GameLeaderboardMemberApiTypeBuilder)