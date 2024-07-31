import { AnyHapticFeedbackParams, initHapticFeedback, initUtils, postEvent, retrieveLaunchParams } from '@telegram-apps/sdk'
import { FC, PropsWithChildren, createContext, useContext, useEffect } from "react"

type TelegramContextLayout = {
    initData: string | null,
    setup: () => void,
    triggerHapticFeedback: (params: AnyHapticFeedbackParams) => void,
    userPfp: string | null,
    refCode: string | null,
    openLink: (link: string) => void,
    shareLink: (link: string) => void,
}

const TelegramContext = createContext<TelegramContextLayout>({
    initData: null,
    setup: () => null,
    triggerHapticFeedback: () => null,
    openLink: (link: string) => null,
    refCode: null,
    shareLink: (link: string) => null,
    userPfp: null
})

export const useTelegram = () => useContext(TelegramContext)

function getInitData () {
    try {
        const { initDataRaw, platform } = retrieveLaunchParams();
        if (!platform.includes('iphone') && !platform.includes('android')) return null
        return initDataRaw ? initDataRaw : null
    } catch {
        return null
    }
}

function getLaunchParams () {
    try {
        return retrieveLaunchParams()
    } catch {
        return null
    }
}

function getHapticFeedback () {
    try {
        return initHapticFeedback()
    } catch {
        return null
    }
}

function getUtils () {
    try {
        return initUtils()
    } catch {
        return null
    }
}

export const TelegramProvider: FC<PropsWithChildren> = ({children}) => {

    const launchParams = getLaunchParams()
    const initData = getInitData()
    const userPfp = launchParams?.initData?.user?.photoUrl || null
    const refCode = launchParams?.startParam || null
    const utils = getUtils()
    const hapticFeedback = getHapticFeedback()

    function setup () {
        postEvent('web_app_expand')
        postEvent('web_app_set_background_color', { color: '#111217' })
        postEvent('web_app_set_header_color', { color: '#111217' })
        postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false })
        postEvent('web_app_ready')
        postEvent('web_app_trigger_haptic_feedback', { type: "impact", impact_style: "heavy" })
    }

    function triggerHapticFeedback (params: AnyHapticFeedbackParams) {
        if (hapticFeedback) {
            if (params.type === "impact") hapticFeedback.impactOccurred(params.impact_style)
            else if (params.type === "notification") hapticFeedback.notificationOccurred(params.notification_type)
            else hapticFeedback.selectionChanged()
        }
    }

    function openLink (link: string) {
        if (utils) {
            if (link.includes('t.me')) {
                utils.openTelegramLink(link)
            } else {
                utils.openLink(link)
            }
        }
    }

    function shareLink (link: string) {
        if (utils) utils.shareURL(link)
    }

    return (
        <TelegramContext.Provider
        value={{
            initData,
            setup,
            triggerHapticFeedback,
            userPfp,
            openLink,
            refCode,
            shareLink
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