export enum TelegramEmojiType {
    HatchingChick = 'hatching_chich',
    Gamepad = 'gamepad',
    FinishFlag = 'finish_flag'
}

export enum TelegramEmojiSize {
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