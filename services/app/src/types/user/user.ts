import { ApiTypeBuilder } from "@builders"

export type UserProfileApi = {
    username: string,
    first_name: string,
    last_name: string,
    game_tickets: number,
    points: number,
    game_records: number,
    is_first_login: boolean
}

export type UserProfile = {
    username: string,
    firstName: string,
    lastName: string,
    gameTickets: number,
    points: number,
    gameRecord: number,
    isFirstLogin: boolean
}

export const UserProfileApiTypeBuilder = new ApiTypeBuilder<UserProfileApi, UserProfile>(
    (i) => ({
        username: i.username,
        firstName: i.first_name,
        lastName: i.last_name,
        gameTickets: i.game_tickets,
        points: i.points,
        gameRecord: i.game_records,
        isFirstLogin: i.is_first_login
    })
)