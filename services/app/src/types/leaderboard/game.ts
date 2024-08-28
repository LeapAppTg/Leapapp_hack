import { ApiTypeBuilder } from "@builders"
import { ApiArrayTypeBuilder } from "../query_multiple"

export type GameLeaderboardMemberApi = {
    username: string,
    first_name: string,
    last_name: string,
    game_records: number
}

export type GameLeaderboardMember = {
    username: string,
    firstName: string,
    lastName: string,
    record: number
}

export const GameLeaderboardMemberApiTypeBuilder = new ApiTypeBuilder<GameLeaderboardMemberApi, GameLeaderboardMember>(
    (i) => ({
        username: i.username,
        record: i.game_records,
        firstName: i.first_name,
        lastName: i.last_name
    })
)

export const GameLeaderboardApiTypeBuilder = new ApiArrayTypeBuilder(GameLeaderboardMemberApiTypeBuilder)