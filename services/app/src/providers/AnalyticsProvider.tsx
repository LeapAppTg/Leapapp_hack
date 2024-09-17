import { useEffect } from "react";
import { Analytics } from "@utils";
import {ApiRoutes, useData} from "@hooks";

export const AnalyticsProvider = () => {
    const { data: userProfile } = useData(ApiRoutes.GetUserProfile);
    const { data: dailyReward } = useData(ApiRoutes.GetDailyReward);
    const { data: hourlyReward } = useData(ApiRoutes.GetHourlyReward);

    useEffect(() => {
        Analytics.init();
    }, []);

    useEffect(() => {
        if (userProfile) {
            Analytics.identifyUser(userProfile);
        }
    }, [userProfile]);

    useEffect(() => {
        if (hourlyReward) {
            Analytics.syncHourlyReward(hourlyReward);
        }
    }, [hourlyReward]);

    useEffect(() => {
        if (dailyReward) {
            Analytics.syncDailyReward(dailyReward);
        }
    }, [dailyReward]);

    return null;
};
