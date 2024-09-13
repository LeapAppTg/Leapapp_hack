import mixpanel from 'mixpanel-browser';
import { MIXPANEL_TOKEN } from '@constants';
import {DailyReward, HourlyReward, UserProfile} from "@types";

type TrackEventTypes = {
    "end_game": [number, string];
    "start_game": [];
};

type TrackEventParams<K extends keyof TrackEventTypes> = TrackEventTypes[K];

class Analytics {
    static init() {
        mixpanel.init(MIXPANEL_TOKEN, {
            track_pageview: 'url-with-path',
        });
    }

    static identifyUser(userProfile: UserProfile) {
        if (userProfile) {
            mixpanel.identify(userProfile.telegramId.toString());
            mixpanel.people.set({
                "$first_name": userProfile.firstName,
                "$last_name": userProfile.lastName,
                "username": userProfile.username,
            });
        }
    }

    static syncUserData(userProfile: UserProfile, hourlyReward: HourlyReward, dailyReward: DailyReward) {
        if (userProfile) {
            mixpanel.people.set({
                points: userProfile.points,
                game_tickets: userProfile.gameTickets,
            });
        }
        if (hourlyReward) {
            mixpanel.people.set({
                hourly_income: hourlyReward.income,
            });
        }
        if (dailyReward) {
            mixpanel.people.set({
                daily_streak: dailyReward.days,
            });
        }
    }

    static trackEvent<K extends keyof TrackEventTypes>(eventName: K, ...params: TrackEventParams<K>) {
        if (eventName === "end_game") {
            const [points, end_type] = params;
            mixpanel.track(eventName, { points, end_type });
        } else {
            mixpanel.track(eventName);
        }
    }
}

export default Analytics;
