import { ApiError } from "@builders"
import { ApiRoutes, useData, useLocalStorage } from "@hooks"
import { postTokenRefresh, postUserAuth } from "@services"
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { SWRConfig } from "swr"
import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { useTelegram } from "./"

type AuthContextLayout = {
    authToken: string | null,
    isAuthorized: boolean,
    setIsAuthorized: Dispatch<SetStateAction<boolean>>,
    logout: () => any,
    tryRefreshToken: () => Promise<any>,
    isFirstTimeLogin: boolean
}

const AuthContext = createContext<AuthContextLayout>({
    authToken: null,
    isAuthorized: false,
    setIsAuthorized: () => null,
    logout: () => null,
    tryRefreshToken: async () => null,
    isFirstTimeLogin: true
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {

    const [authToken, setAuthToken] = useLocalStorage('auth_token')

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const [isFirstTimeLogin, setIsFirstTimeLogin] = useState<boolean>(false)

    const { initData } = useTelegram()

    const tryAuth = async () => {
        try {
            if (!initData) return

            const response = await postUserAuth(initData)

            setIsFirstTimeLogin(true)
            setAuthToken(response.access_token)
            
            return response.access_token
        } catch (e) {
            return
        }
    }

    const tryRefreshToken = async () => {
        try {
            const response = await postTokenRefresh()

            setAuthToken(response.access_token)
            
            return response.access_token
        } catch (e) {

            if (ApiError.isApiError(e) && e.statusCode === 404) {
                tryAuth()
            }
            
            return null
        }
    }

    const logout = () => {
        setAuthToken(null)

        try {
            
        } catch (e) {
            // i dont think we need to do anything there?
        }
    }

    return (
        <AuthContext.Provider
        value={{
            authToken,
            logout,
            isAuthorized,
            setIsAuthorized,
            tryRefreshToken,
            isFirstTimeLogin
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
    
    if (initData) return <AuthConsumerContent/>
    return null
}

const AuthConsumerContent: FC = () => {
    const { initData } = useTelegram()
    const { error, isLoading } = useData(ApiRoutes.GetDailyReward)

    const { isAuthorized, setIsAuthorized } = useAuth()

    useEffect(() => {
        if (isAuthorized || isLoading || !initData) return
        if (error) return
        setIsAuthorized(true)
    }, [isAuthorized, isLoading, error, initData])

    return null
}