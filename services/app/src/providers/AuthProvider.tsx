import { ApiError } from "@builders"
import { ApiRoutes, useData, useLocalStorage } from "@hooks"
import { postTokenRefresh, postUserAuth } from "@services"
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { SWRConfig } from "swr"
import { useTelegram } from "./"
import { QuestCategory } from "@types"
import mixpanel from "mixpanel-browser"

type AuthContextLayout = {
    authToken: string | null,
    isAuthorized: boolean,
    setIsAuthorized: Dispatch<SetStateAction<boolean>>,
    setIsFirstTimeLogin: Dispatch<SetStateAction<boolean>>,
    logout: () => any,
    tryRefreshToken: () => Promise<any>,
    isFirstTimeLogin: boolean
}

const AuthContext = createContext<AuthContextLayout>({
    authToken: null,
    isAuthorized: false,
    setIsAuthorized: () => null,
    setIsFirstTimeLogin: () => null,
    logout: () => null,
    tryRefreshToken: async () => null,
    isFirstTimeLogin: true
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {

    const [authToken, setAuthToken] = useLocalStorage('auth_token')

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [isFirstTimeLogin, setIsFirstTimeLogin] = useState<boolean>(false)

    const { initData, refCode } = useTelegram()

    const tryAuth = async () => {
        try {
            if (!initData) return
            const response = await postUserAuth(initData, refCode || undefined)
            setAuthToken(response.access_token)
        } catch (e) {}
    }

    const tryRefreshToken = async () => {
        try {
            const response = await postTokenRefresh()
            setAuthToken(response.access_token)
        } catch (e) {
            if (ApiError.isApiError(e) && (e.statusCode === 404 || e.statusCode === 400)) {
                tryAuth()
            }
        }
    }

    const logout = () => {
        setAuthToken(null)

        try {
            
        } catch (e) {
            // i dont think we need to do anything there?
        }
    }

    useEffect(() => {
        setAuthToken(null)
        tryAuth()
    }, [])

    return (
        <AuthContext.Provider
        value={{
            authToken,
            logout,
            isAuthorized,
            setIsAuthorized,
            tryRefreshToken,
            isFirstTimeLogin,
            setIsFirstTimeLogin
        }}
        >
            <SWRConfig value={{
                onError: (e) => {
                    if (ApiError.isApiError(e)) {
                        if (e.statusCode === 401 || e.statusCode === 403) {
                            tryRefreshToken()
                        }
                    }
                },
                onErrorRetry: (error, _key, _config, revalidate, { retryCount }) => {
                    if (ApiError.isApiError(error) && (error.statusCode === 404 || error.statusCode === 401 || error.statusCode === 403 || error.statusCode === 500)) return
                    if (retryCount >= 2) return
                    setTimeout(() => revalidate({ retryCount }), 1000)
                }
            }}>
                {children}
            </SWRConfig>
        </AuthContext.Provider>
    )
}

export const AuthConsumer: FC = () => {
    const { initData } = useTelegram()
    
    if (initData !== null) return <AuthConsumerContent/>
    
    return null
}

const AuthConsumerContent: FC = () => {
    const { isAuthorized, setIsAuthorized, setIsFirstTimeLogin } = useAuth()

    const { data: userProfile } = useData(ApiRoutes.GetUserProfile)
    const { data: dailyReward } = useData(ApiRoutes.GetDailyReward)
    const { data: hourlyReward } = useData(ApiRoutes.GetHourlyReward)
    useData(ApiRoutes.GetQuests, QuestCategory.Leap)
    useData(ApiRoutes.GetQuests, QuestCategory.Partnership)
    useData(ApiRoutes.GetReferralsCount)
    useData(ApiRoutes.GetReferralsList)
    useData(ApiRoutes.GetUnclaimedPoints)
    useData(ApiRoutes.GetGameLeaderboard)
    useData(ApiRoutes.GetMarketItemsList)

    useEffect(() => {
        if (isAuthorized || !userProfile || !dailyReward) return
        if (userProfile.isFirstLogin) setIsFirstTimeLogin(true)
        setIsAuthorized(true)
        mixpanel.identify(userProfile.telegramId.toString())
        mixpanel.people.set("$first_name", userProfile.firstName)
        mixpanel.people.set("$last_name", userProfile.lastName)
        mixpanel.people.set("username", userProfile.username)
    }, [isAuthorized, userProfile, dailyReward])

    useEffect(() => {
        if (!userProfile) return
        mixpanel.people.set("points", userProfile.points)
        mixpanel.people.set("game_tickets", userProfile.gameTickets)
    }, [userProfile])

    useEffect(() => {
        if (!hourlyReward) return
        mixpanel.people.set("hourly_income", hourlyReward.income)
    }, [hourlyReward])

    useEffect(() => {
        if (!dailyReward) return
        mixpanel.people.set("daily_streak", dailyReward.days)
    }, [dailyReward])

    return null
}