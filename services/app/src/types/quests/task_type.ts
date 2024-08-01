import { ApiTypeBuilder } from "@builders"

export enum TaskType {
    None = 'none',
    
    Link = 'link',
    Telegram = 'telegram',
    X = 'x',
    Youtube = 'youtube',
    Instagram = 'instagram',
    Facebook = 'facebook',
    Discord = 'discord',
    Threads = 'threads',

    Invite = 'invite',
    Game = 'game',
    Days = 'days',
    Points = 'points'
}

const TaskTypeMapping: Record<string, TaskType> = {
    'none': TaskType.None,
    'link': TaskType.Link,
    'invite': TaskType.Invite,
    'game': TaskType.Game,
    'x': TaskType.X,
    'telegram': TaskType.Telegram,
    'days': TaskType.Days,
    'points': TaskType.Points,
    'discord': TaskType.Discord,
    'facebook': TaskType.Facebook,
    'instagram': TaskType.Instagram,
    'youtube': TaskType.Youtube,
    'threads': TaskType.Threads
}

export const TaskTypeApiTypeBuilder = new ApiTypeBuilder<string, TaskType, false>(
    (i) => {
        return TaskTypeMapping[i] || TaskType.None
    }
)