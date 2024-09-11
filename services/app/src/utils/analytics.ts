import mixpanel from 'mixpanel-browser';
import { MIXPANEL_TOKEN } from '@constants';

class Analytics {
    static init() {
        mixpanel.init(MIXPANEL_TOKEN, {
            track_pageview: 'url-with-path',
        });
    }

    static identifyUser(userProfile: any) {
        if (userProfile) {
            mixpanel.identify(userProfile.telegramId.toString());
            mixpanel.people.set({
                "$first_name": userProfile.firstName,
                "$last_name": userProfile.lastName,
                "username": userProfile.username,
            });
        }
    }

    static syncUserData(userProfile: any, hourlyReward: any, dailyReward: any) {
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

    static trackEvent(eventName: string, data?: Record<string, any>) {
        mixpanel.track(eventName, data);
    }

    static trackGameEnd(score: number, endType: string) {
        this.trackEvent("end_game", { "points": score, "end_type": endType });
    }

    static trackGameStart() {
        this.trackEvent("start_game");
    }
}

export default Analytics;
