import { AnyHapticFeedbackParams, postEvent, retrieveLaunchParams, initSwipeBehavior } from '@telegram-apps/sdk'
import { FC, PropsWithChildren, createContext, useContext, useEffect } from "react"

type TelegramContextLayout = {
    initData: string | null,
    setup: () => void,
    triggerHapticFeedback: (params: AnyHapticFeedbackParams) => void,
    userPfp?: string
}

const TelegramContext = createContext<TelegramContextLayout>({
    initData: null,
    setup: () => null,
    triggerHapticFeedback: () => null
})

export const useTelegram = () => useContext(TelegramContext)

function getInitData () {
    try {
        const { initDataRaw, platform } = retrieveLaunchParams();
        if (!/android||iphone/.test(platform)) return null
        return initDataRaw ? initDataRaw : null
    } catch {
        return 'query_id=AAFGSL8jAwAAAEZIvyOyWy8l&user=%7B%22id%22%3A7042189382%2C%22first_name%22%3A%22fedoras%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22fedgod%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1721232612&hash=95a0d2807982d1142112be5a2c052ab72edf8a76dd5ecc067f0e71edd9f4cf61'
        return null
    }
}

function getUserPfp () {
    try {
        const { initData } = retrieveLaunchParams()
        return initData?.user?.photoUrl
    } catch {
        return undefined
    }
}

export const TelegramProvider: FC<PropsWithChildren> = ({children}) => {

    const initData = getInitData()
    const userPfp = getUserPfp()

    function setup () {
        return
        postEvent('web_app_expand')
        postEvent('web_app_set_background_color', { color: '#111217' })
        postEvent('web_app_set_header_color', { color: '#111217' })
        postEvent('web_app_ready')
        postEvent('web_app_trigger_haptic_feedback', { type: "impact", impact_style: "heavy" })
        postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })
    }

    function triggerHapticFeedback (params: AnyHapticFeedbackParams) {
        return
        postEvent('web_app_trigger_haptic_feedback', params)
    }

    return (
        <TelegramContext.Provider
        value={{
            initData,
            setup,
            triggerHapticFeedback,
            userPfp
        }}
        >
            {children}
        </TelegramContext.Provider>
    )
}

export const TelegramConsumer: FC = () => {
    const { initData, setup } = useTelegram()

    useEffect(() => {
        if (!initData) return
        setup()
    }, [])

    return null
}