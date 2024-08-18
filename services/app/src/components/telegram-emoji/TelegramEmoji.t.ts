export enum TelegramEmojiType {
    HatchingChick = 'hatching_chich',
    Gamepad = 'gamepad',
    FinishFlag = 'finish_flag',
    Rocket = 'rocket',
    MoneyBag = 'money_bag',
    Time = 'time',
    Ticket = 'ticket',
    Bomb = 'bomb',
    Lightning = 'lightning',
    Books = 'books',
    RollerCoaster = 'roller_coaster',
    ChampangeGlasses = 'champange_glasses',
    Megaphone = 'megaphone',
    Handwave = 'handwave',
    Cup = 'cup',
    Butterfly = 'butterfly',
    Candy = 'candy',
    Eye = 'eye',
    PartyBall = 'party_ball',
    ColorPalette = 'color_palette'
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
     * @width 32px
     */
    Submedium = 'submedium',
    /**
     * @width 28px
     */
    MediumSmall = 'medium_small',
    /**
     * @width 20px
     */
    Small = 'small'
}

export type TelegramEmojiProps = {
    size: TelegramEmojiSize,
    type: TelegramEmojiType
}