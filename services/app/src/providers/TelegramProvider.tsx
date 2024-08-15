import { AnyHapticFeedbackParams, initHapticFeedback, initUtils, postEvent, retrieveLaunchParams, BackButton, initBackButton } from '@telegram-apps/sdk'
import { FC, PropsWithChildren, createContext, useContext, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'

type TelegramContextLayout = {
    initData: string | null,
    isMobile: boolean,
    setup: () => void,
    triggerHapticFeedback: (params: AnyHapticFeedbackParams) => void,
    userPfp: string | null,
    refCode: string | null,
    openLink: (link: string) => void,
    openTelegramLink: (link: string) => void,
    shareLink: (link: string) => void,
    backButton: BackButton | null,
    backButtonDefaultCallback: () => void
}

const TelegramContext = createContext<TelegramContextLayout>({
    initData: null,
    isMobile: true,
    setup: () => null,
    triggerHapticFeedback: () => null,
    openLink: () => null,
    openTelegramLink: () => null,
    refCode: null,
    shareLink: () => null,
    userPfp: null,
    backButton: null,
    backButtonDefaultCallback: () => null
})

export const useTelegram = () => useContext(TelegramContext)

function getInitData () {
    try {
        const { initDataRaw, platform } = retrieveLaunchParams();
        if (!initDataRaw) return [null, false] as const
        return [initDataRaw, platform.includes('ios') || platform.includes('android')] as const
    } catch {
        return [
            null,
            false
        ] as const
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

function getBackButton () {
    try {
        return initBackButton()[0]
    } catch {
        return null
    }
}

export const TelegramProvider: FC<PropsWithChildren> = ({children}) => {

    const launchParams = getLaunchParams()
    const [initData, isMobile] = getInitData()
    const userPfp = launchParams?.initData?.user?.photoUrl || null
    const refCode = launchParams?.startParam || null
    const utils = getUtils()
    const hapticFeedback = getHapticFeedback()
    const backButton = getBackButton()

    const { pathname } = useLocation()
    const navigate = useNavigate()

    function setup () {
        postEvent('web_app_setup_closing_behavior', { need_confirmation: true })
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

    function openTelegramLink (link: string) {
        utils?.openTelegramLink(link)
    }

    function openLink (link: string) {
        utils?.openLink(link)
    }

    function shareLink (link: string) {
        if (utils) utils.shareURL(link)
    }

    function backButtonDefaultCallback () {
        navigate('/home')
    }

    useEffect(() => {
        if (backButton) {
            if(['referrals', 'quests', 'game', 'customize', 'boost', 'leaderboard'].findIndex(i => pathname.includes(i)) !== -1) {
                if (!backButton.isVisible) {
                    backButton.show()
                    backButton.on("click", backButtonDefaultCallback)
                    return () => {
                        backButton.off("click", backButtonDefaultCallback)
                    }
                }
            } else {
                backButton.hide()
            }
        }
    }, [pathname])

    return (
        <TelegramContext.Provider
        value={{
            initData,
            isMobile,
            setup,
            triggerHapticFeedback,
            userPfp,
            openLink,
            openTelegramLink,
            refCode,
            shareLink,
            backButton,
            backButtonDefaultCallback
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