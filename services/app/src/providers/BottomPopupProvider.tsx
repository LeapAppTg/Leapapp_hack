import { BottomPopup } from '@components'
import { Dispatch, FC, PropsWithChildren, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type BottomPopupContextProps = {
    popup: ReactNode,
    showPopup: (popup: ReactNode) => void,
    hidePopup: () => void,
    isClosing: boolean,
    isPopupLoading: boolean,
    setIsPopupLoading: Dispatch<SetStateAction<boolean>>
}

const BottomPopupContext = createContext<BottomPopupContextProps>({
    popup: null,
    showPopup: (p) => null,
    hidePopup: () => null,
    isClosing: false,
    isPopupLoading: false,
    setIsPopupLoading: () => null
})

export const useBottomPopup = () => useContext(BottomPopupContext)

export const BottomPopupProvider: FC<PropsWithChildren> = ({children}) => {

    const [popup, setPopup] = useState<ReactNode | null>(null)
    const [isPopupLoading, setIsPopupLoading] = useState<boolean>(false)
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
                isClosing,
                isPopupLoading,
                setIsPopupLoading
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
                ({ popup, isPopupLoading }) => <>
                    {
                        popup === null || isPopupLoading
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