import { ApiTypeBuilder } from "@builders"
import { EnumMatcher } from "@utils"

export enum QuestCategory {
    Leap = 'leap',
    Partnership = 'partnership'
}

const QuestCategoryMapping: Record<string, QuestCategory> = {
    'leap': QuestCategory.Leap,
    'partnership': QuestCategory.Partnership
}

export const QuestCategoryApiTypeBuilder = new ApiTypeBuilder<string, QuestCategory, false>(
    (i) => {
        return QuestCategoryMapping[i] || QuestCategory.Leap
    }
)

export const QuestCategoryApiStringMatcher = new EnumMatcher<QuestCategory, string, 'leap'>(
    {
        [QuestCategory.Leap]: 'leap',
        [QuestCategory.Partnership]: 'partnership'
    },
    'leap'
)