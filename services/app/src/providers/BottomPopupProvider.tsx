import { Alert, AlertProps, BottomPopup } from '@components'
import { FC, PropsWithChildren, ReactNode, createContext, useContext, useEffect, useReducer, useState } from 'react'

type BottomPopupContextProps = {
    popup: ReactNode,
    showPopup: (popup: ReactNode) => void,
    hidePopup: () => void,
    isClosing: boolean
}

const BottomPopupContext = createContext<BottomPopupContextProps>({
    popup: null,
    showPopup: (p) => null,
    hidePopup: () => null,
    isClosing: false
})

export const useBottomPopup = () => useContext(BottomPopupContext)

export const BottomPopupProvider: FC<PropsWithChildren> = ({children}) => {

    const [popup, setPopup] = useState<ReactNode | null>(null)
    const showPopup = (popup: ReactNode) => setPopup(popup)
    const onHide = () => setPopup(null)
    const [isClosing, setIsClosing] = useState<boolean>(false)
    const hidePopup = () => {
        setIsClosing(prev => {
            if (prev) return prev
            setTimeout(onHide, 500)
            return true
        })
    }
    useEffect(() => {
        setIsClosing(false)
    }, [popup])

    return (
        <BottomPopupContext.Provider
            value={{
                popup,
                showPopup,
                hidePopup,
                isClosing
            }}
        >
            {children}
        </BottomPopupContext.Provider>
    )
}

export const BottomPopupConsumer: FC = () => {
    return (
        <BottomPopupContext.Consumer>
            {
                ({ popup }) => <>
                    {
                        popup === null
                        ?
                        null
                        :
                        <BottomPopup>
                            {popup}
                        </BottomPopup>
                    }
                </>
            }
        </BottomPopupContext.Consumer>
    )
}