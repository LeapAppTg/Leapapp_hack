import { ApiTypeBuilder } from "@builders"

export enum QuestType {
    None = 'none',
    
    Link = 'link',
    Telegram = 'telegram',
    X = 'x',
    Youtube = 'youtube',
    Instagram = 'instagram',
    Facebook = 'facebook',
    Discord = 'discord',
    Threads = 'threads',
    Tiktok = 'tiktok',

    Invite = 'invite',
    Game = 'game',
    Days = 'days',
    Points = 'points'
}

const QuestTypeMapping: Record<string, QuestType> = {
    'none': QuestType.None,
    'link': QuestType.Link,
    'invite': QuestType.Invite,
    'game': QuestType.Game,
    'x': QuestType.X,
    'telegram': QuestType.Telegram,
    'days': QuestType.Days,
    'points': QuestType.Points,
    'discord': QuestType.Discord,
    'facebook': QuestType.Facebook,
    'instagram': QuestType.Instagram,
    'youtube': QuestType.Youtube,
    'threads': QuestType.Threads,
    'tiktok': QuestType.Tiktok
}

export const QuestTypeApiTypeBuilder = new ApiTypeBuilder<string, QuestType, false>(
    (i) => {
        return QuestTypeMapping[i] || QuestType.None
    }
)