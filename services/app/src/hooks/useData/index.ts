import { UseQuestDetailsProps, useQuestDetailsData, useQuestsListData } from "./useQuestsData";
import { useInviteLinkData, useReferralsCountData, useReferralsListData, useUnclaimedPointsData } from "./useReferralData";
import { useDailyRewardData, useHourlyRewardData, useUserProfileData } from "./useUserData";

export enum ApiRoutes {
    GetDailyReward = '/get/daily-reward/',
    GetHourlyReward = '/get/hourly-reward/',
    GetUserProfile = '/get/user-profile/',
    GetQuestsList = '/get/quests-list/',
    GetQuestDetails = '/get/quest-details/',
    GetInviteLink = '/get/invite-link/',
    GetUnclaimedPoints = '/get/unclaimed-points/',
    GetReferralsList = '/get/referrals-list/',
    GetReferralsCount = '/get/referrals-count/'
}

type UseDataTypesMap = {
    [ApiRoutes.GetDailyReward]: [[], ReturnType<typeof useDailyRewardData>],
    [ApiRoutes.GetHourlyReward]: [[], ReturnType<typeof useHourlyRewardData>],
    [ApiRoutes.GetUserProfile]: [[], ReturnType<typeof useUserProfileData>],
    [ApiRoutes.GetQuestsList]: [[], ReturnType<typeof useQuestsListData>],
    [ApiRoutes.GetQuestDetails]: [UseQuestDetailsProps, ReturnType<typeof useQuestDetailsData>],
    [ApiRoutes.GetInviteLink]: [[], ReturnType<typeof useInviteLinkData>],
    [ApiRoutes.GetUnclaimedPoints]: [[], ReturnType<typeof useUnclaimedPointsData>],
    [ApiRoutes.GetReferralsList]: [[], ReturnType<typeof useReferralsListData>],
    [ApiRoutes.GetReferralsCount]: [[], ReturnType<typeof useReferralsCountData>]
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
        case ApiRoutes.GetHourlyReward:
            return useHourlyRewardData() as UseDataReturnType<K>;
        case ApiRoutes.GetUserProfile:
            return useUserProfileData() as UseDataReturnType<K>;
        case ApiRoutes.GetQuestsList:
            return useQuestsListData() as UseDataReturnType<K>;
        case ApiRoutes.GetQuestDetails:
            return useQuestDetailsData(...params as UseQuestDetailsProps) as UseDataReturnType<K>;
        case ApiRoutes.GetInviteLink:
            return useInviteLinkData() as UseDataReturnType<K>;
        case ApiRoutes.GetUnclaimedPoints:
            return useUnclaimedPointsData() as UseDataReturnType<K>;
        case ApiRoutes.GetReferralsList:
            return useReferralsListData() as UseDataReturnType<K>;
        case ApiRoutes.GetReferralsCount:
            return useReferralsCountData() as UseDataReturnType<K>;
        default:
            return null as UseDataReturnType<K>;
    }
}