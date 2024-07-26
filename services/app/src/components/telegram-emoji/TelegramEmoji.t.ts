export enum TelegramEmojiType {
    HatchingChick = 'hatching_chich',
    Gamepad = 'gamepad',
    FinishFlag = 'finish_flag',
    Rocket = 'rocket',
    MoneyBag = 'money_bag',
    Time = 'time',
    Ticket = 'ticket',
    Bomb = 'bomb',
    Lightning = 'lightning'
}

export enum TelegramEmojiSize {
    /**
     * @width 100px
     */
    XXLarge = 'x_x_large',
    /**
     * @width 60px
     */
    Large = 'large',
    /**
     * @width 40px
     */
    Medium = 'medium',
    /**
     * @width 20px
     */
    Small = 'small'
}

export type TelegramEmojiProps = {
    size: TelegramEmojiSize,
    type: TelegramEmojiType
}