import { Alert, AlertProps, BottomPopup } from '@components'
import { FC, PropsWithChildren, ReactNode, createContext, useContext, useReducer, useState } from 'react'

type BottomPopupContextProps = {
    popup: ReactNode,
    showPopup: (popup: ReactNode) => void,
    hidePopup: () => void
}

const BottomPopupContext = createContext<BottomPopupContextProps>({
    popup: null,
    showPopup: (p) => null,
    hidePopup: () => null
})

export const useBottomPopup = () => useContext(BottomPopupContext)

export const BottomPopupProvider: FC<PropsWithChildren> = ({children}) => {

    const [popup, setPopup] = useState<ReactNode | null>(null)
    const showPopup = (popup: ReactNode) => setPopup(popup)
    const hidePopup = () => setPopup(null)

    return (
        <BottomPopupContext.Provider
            value={{
                popup,
                showPopup,
                hidePopup
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