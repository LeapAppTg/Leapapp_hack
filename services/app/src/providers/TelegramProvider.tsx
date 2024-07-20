import { ApiError } from "@builders"
import { ApiRoutes, useData, useLocalStorage } from "@hooks"
import { postTokenRefresh, postUserAuth } from "@services"
import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import { SWRConfig } from "swr"
import { retrieveLaunchParams } from '@telegram-apps/sdk';

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