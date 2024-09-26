import { ApiTypeBuilder } from "@builders"

export enum QuestType {
    Link = 'link',
    TelegramLink = 'telegram_link',
    ConsecutiveDaysMilestone = 'consecutive_days_milestone',
    PointsMilestone = 'points_milestone',
    ReferralsMilestone = 'referrals_milestone',
}

const QuestTypeMapping: Record<string, QuestType> = {
    'link': QuestType.Link,
    'telegram_link': QuestType.TelegramLink,
    'consecutive_days_milestone': QuestType.ConsecutiveDaysMilestone,
    'points_milestone': QuestType.PointsMilestone,
    'referrals_milestone': QuestType.ReferralsMilestone
}

export const QuestTypeApiTypeBuilder = new ApiTypeBuilder<string, QuestType, false>(
    (i) => {
        return QuestTypeMapping[i] || QuestType.Link
    }
)