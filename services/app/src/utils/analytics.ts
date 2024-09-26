import mixpanel from 'mixpanel-browser';
import { MIXPANEL_TOKEN } from '@constants';
import {DailyReward, UserProfile} from "@types";

type TrackEventTypes = {
    "end_game": { points: number; end_type: string };
    "start_game": {};
};
type TrackEventParams<K extends keyof TrackEventTypes> = TrackEventTypes[K];

export class Analytics {
    static init() {
        mixpanel.init(MIXPANEL_TOKEN, {
            track_pageview: 'url-with-path',
        });
    }

    static identifyUser(userProfile: UserProfile) {
        mixpanel.identify(userProfile.telegramId.toString());
        mixpanel.people.set({
            $first_name: userProfile.firstName,
            $last_name: userProfile.lastName,
            username: userProfile.username,
            points: userProfile.points,
            game_tickets: userProfile.gameTickets,
        });
    }

    static syncDailyReward(dailyReward: DailyReward) {
        mixpanel.people.set({
            daily_streak: dailyReward.days,
        });
    }

    static trackEvent<K extends keyof TrackEventTypes>(eventName: K, params?: TrackEventParams<K>) {
        mixpanel.track(eventName, params);
    }
}