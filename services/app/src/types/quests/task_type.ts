import { ApiTypeBuilder } from "@builders"

export enum TaskType {
    None = 'none',
    Link = 'link',
    Invite = 'invite',
    Game = 'game'
}

const TaskTypeMapping: Record<string, TaskType> = {
    'none': TaskType.None,
    'link': TaskType.Link,
    'invite': TaskType.Invite,
    'game': TaskType.Game
}

export const TaskTypeApiTypeBuilder = new ApiTypeBuilder<string, TaskType, false>(
    (i) => {
        return TaskTypeMapping[i] || TaskType.None
    }
)