import { ApiTypeBuilder } from "@builders"
import { EnumMatcher } from "@utils"

export enum QuestCategory {
    Social = 'social'
}

const QuestCategoryMapping: Record<string, QuestCategory> = {
    'social': QuestCategory.Social
}

export const QuestCategoryApiTypeBuilder = new ApiTypeBuilder<string, QuestCategory, false>(
    (i) => {
        return QuestCategoryMapping[i] || QuestCategory.Social
    }
)

export const QuestCategoryStringMatcher = new EnumMatcher<QuestCategory, string, 'Social'>(
    {
        [QuestCategory.Social]: 'Social',
    },
    'Social'
)