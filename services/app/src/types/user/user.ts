import { ApiTypeBuilder } from "@builders"

export type UserProfileApi = {
    telegram_id: number,
    username: string | null,
    first_name: string,
    last_name: string,
    game_tickets: number,
    points: number,
    game_records: number,
    is_first_login: boolean
}

export type UserProfile = {
    telegramId: number,
    username: string | null,
    firstName: string,
    lastName: string,
    gameTickets: number,
    points: number,
    gameRecord: number,
    isFirstLogin: boolean
}

export const UserProfileApiTypeBuilder = new ApiTypeBuilder<UserProfileApi, UserProfile>(
    (i) => ({
        telegramId: i.telegram_id,
        username: i.username,
        firstName: i.first_name,
        lastName: i.last_name,
        gameTickets: i.game_tickets,
        points: i.points,
        gameRecord: i.game_records,
        isFirstLogin: i.is_first_login
    })
)