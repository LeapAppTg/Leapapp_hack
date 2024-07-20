import { ApiTypeBuilder } from "@builders"

export type UserProfileApi = {
    username: string,
    first_name: string,
    last_name: string,
    game_tickets: number,
    points: number
}

export type UserProfile = {
    username: string,
    firstName: string,
    lastName: string,
    gameTickets: number,
    points: number
}

export const UserProfileApiTypeBuilder = new ApiTypeBuilder<UserProfileApi, UserProfile>(
    (i) => ({
        username: i.username,
        firstName: i.first_name,
        lastName: i.last_name,
        gameTickets: i.game_tickets,
        points: i.points
    })
)