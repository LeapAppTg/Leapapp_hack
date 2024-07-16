export enum TelegramEmojiType {
    HatchingChick = 'hatching_chich',
    Gamepad = 'gamepad',
    FinishFlag = 'finish_flag',
    Rocket = 'rocket'
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
    Medium = 'medium'
}

export type TelegramEmojiProps = {
    size: TelegramEmojiSize,
    type: TelegramEmojiType
}