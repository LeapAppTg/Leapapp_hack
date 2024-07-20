import { API_URL } from "@constants"
import { retrieveLaunchParams } from '@telegram-apps/sdk'
import { FC, PropsWithChildren, createContext, useContext } from "react"

type TelegramContextLayout = {
    initData: string | null
}

const TelegramContext = createContext<TelegramContextLayout>({
    initData: null
})

export const useTelegram = () => useContext(TelegramContext)

const getInitData = () => {
    try {
        const { initDataRaw } = retrieveLaunchParams();
        console.log('init data', initDataRaw)
        console.log('Api URL', API_URL)
        return initDataRaw ? initDataRaw : null
    } catch {
        return null
    }
}

export const TelegramProvider: FC<PropsWithChildren> = ({children}) => {

    const initData = getInitData()

    return (
        <TelegramContext.Provider
        value={{
            initData
        }}
        >
            {children}
        </TelegramContext.Provider>
    )
}

export const TelegramConsumer: FC = () => {
    return null
}