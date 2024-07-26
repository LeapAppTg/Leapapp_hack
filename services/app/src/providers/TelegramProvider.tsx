import { AnyHapticFeedbackParams, postEvent, retrieveLaunchParams, initSwipeBehavior } from '@telegram-apps/sdk'
import { FC, PropsWithChildren, createContext, useContext, useEffect } from "react"

type TelegramContextLayout = {
    initData: string | null,
    setup: () => void,
    triggerHapticFeedback: (params: AnyHapticFeedbackParams) => void,
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
        return null
    }
}

export const TelegramProvider: FC<PropsWithChildren> = ({children}) => {

    const initData = getInitData()

    function setup () {
        postEvent('web_app_expand')
        postEvent('web_app_set_background_color', { color: '#111217' })
        postEvent('web_app_set_header_color', { color: '#111217' })
        postEvent('web_app_ready')
        postEvent('web_app_trigger_haptic_feedback', { type: "impact", impact_style: "heavy" })
        postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })
    }

    function triggerHapticFeedback (params: AnyHapticFeedbackParams) {
        postEvent('web_app_trigger_haptic_feedback', params)
    }

    return (
        <TelegramContext.Provider
        value={{
            initData,
            setup,
            triggerHapticFeedback
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