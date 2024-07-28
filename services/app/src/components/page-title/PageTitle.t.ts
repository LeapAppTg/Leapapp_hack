import { PageTitleBackgroundColor, TelegramEmojiType } from "@components"

export type PageTitleProps = {
    icon?: TelegramEmojiType,
    title: string,
    subtitle?: string,
    color: PageTitleBackgroundColor
}
