import { useGameLeaderboardData } from "./useLeaderboardData";
import { useMarketItemsListData } from "./useMarketData";
import { UseQuestsDataProps, useQuestsData } from "./useQuestsData";
import { useInviteLinkData, useReferralInfoData, useReferralsListData, useReferralsMilestonesListData, useUnclaimedPointsData } from "./useReferralData";
import { useDailyRewardData, useUserProfileData } from "./useUserData";

export enum ApiRoutes {
    GetDailyReward = '/get/daily-reward/',
    GetUserProfile = '/get/user-profile/',
    GetQuests = '/get/quests/',
    GetInviteLink = '/get/invite-link/',
    GetUnclaimedPoints = '/get/unclaimed-points/',
    GetReferralsList = '/get/referrals-list/',
    GetReferralInfo = '/get/referral-info/',
    GetReferralsMilestonesList = '/get/referrals/milestones-list/',
    GetGameLeaderboard = '/get/game-leaderboard/',
    GetMarketItemsList = '/get/market-items/'
}

type UseDataTypesMap = {
    [ApiRoutes.GetDailyReward]: [[], ReturnType<typeof useDailyRewardData>],
    [ApiRoutes.GetUserProfile]: [[], ReturnType<typeof useUserProfileData>],
    [ApiRoutes.GetQuests]: [UseQuestsDataProps, ReturnType<typeof useQuestsData>],
    [ApiRoutes.GetInviteLink]: [[], ReturnType<typeof useInviteLinkData>],
    [ApiRoutes.GetUnclaimedPoints]: [[], ReturnType<typeof useUnclaimedPointsData>],
    [ApiRoutes.GetReferralsList]: [[], ReturnType<typeof useReferralsListData>],
    [ApiRoutes.GetReferralInfo]: [[], ReturnType<typeof useReferralInfoData>],
    [ApiRoutes.GetReferralsMilestonesList]: [[], ReturnType<typeof useReferralsMilestonesListData>],
    [ApiRoutes.GetGameLeaderboard]: [[], ReturnType<typeof useGameLeaderboardData>],
    [ApiRoutes.GetMarketItemsList]: [[], ReturnType<typeof useMarketItemsListData>]
}
  
type UseDataParams<K extends ApiRoutes> = K extends keyof UseDataTypesMap ? UseDataTypesMap[K][0] : [];
export type UseDataReturnType<K extends ApiRoutes> = K extends keyof UseDataTypesMap ? UseDataTypesMap[K][1] : null;  

export function useData<
    K extends ApiRoutes
> (
    key: K,
    ...params: UseDataParams<K>
): UseDataReturnType<K> {
    switch (key) {
        case ApiRoutes.GetDailyReward:
            return useDailyRewardData() as UseDataReturnType<K>;
        case ApiRoutes.GetUserProfile:
            return useUserProfileData() as UseDataReturnType<K>;
        case ApiRoutes.GetQuests:
            return useQuestsData(...params as UseQuestsDataProps) as UseDataReturnType<K>;
        case ApiRoutes.GetInviteLink:
            return useInviteLinkData() as UseDataReturnType<K>;
        case ApiRoutes.GetUnclaimedPoints:
            return useUnclaimedPointsData() as UseDataReturnType<K>;
        case ApiRoutes.GetReferralsList:
            return useReferralsListData() as UseDataReturnType<K>;
        case ApiRoutes.GetReferralsMilestonesList:
            return useReferralsMilestonesListData() as UseDataReturnType<K>;
        case ApiRoutes.GetReferralInfo:
            return useReferralInfoData() as UseDataReturnType<K>;
        case ApiRoutes.GetGameLeaderboard:
            return useGameLeaderboardData() as UseDataReturnType<K>;
        case ApiRoutes.GetMarketItemsList:
            return useMarketItemsListData() as UseDataReturnType<K>;
        default:
            return null as UseDataReturnType<K>;
    }
}