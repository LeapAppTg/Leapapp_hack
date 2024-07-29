import { ApiError } from '@builders'
import { Alert, AlertProps, AlertStatus } from '@components'
import { FC, PropsWithChildren, createContext, useContext, useReducer } from 'react'

type RemoveAlert = {
    action: AlertAction.Remove,
    id: number
}

type AddAlert = {
    action: AlertAction.Add,
    item: AlertWithId
}

enum AlertAction {
    Add = 'add',
    Remove = 'remove'
}

type AlertWithId = AlertProps & { id: number }

type AlertsContextProps = {
    alerts: AlertWithId[],
    sendAlert: (item: Omit<AlertProps, "remove">) => number,
    sendApiErrorAlert: (maybeApiError: any) => number,
    removeAlert: (id: number) => void
}

const AlertsContext = createContext<AlertsContextProps>({
    alerts: [],
    sendAlert: () => 0,
    removeAlert: () => null,
    sendApiErrorAlert: () => 0
})

export const useAlerts = () => useContext(AlertsContext)

export const AlertsProvider: FC<PropsWithChildren> = ({children}) => {

    const [alerts, manageAlerts] = useReducer((
        alerts: AlertWithId[], manageAlerts: AddAlert | RemoveAlert
    ) => {
        if (manageAlerts.action === AlertAction.Add) return [...alerts, {...manageAlerts.item }]
        else return alerts.filter(n => n.id !== manageAlerts.id)
    }, [])

    const removeAlert = (id: number) => manageAlerts({
        action: AlertAction.Remove,
        id
    })

    const sendAlert = (item: Omit<AlertProps, "remove">) => {
        const id = Date.now()
        manageAlerts({
            action: AlertAction.Add,
            item: {
                ...item,
                remove: () => removeAlert(id),
                id
            }
        })
        return id
    }
    
    const sendApiErrorAlert = (e: any) => {
        let message: string = 'Something went wrong :('
        if (ApiError.isApiError(e) && e.detail) message = e.detail
        return sendAlert({
            status: AlertStatus.Error,
            message
        })
    }

    return (
        <AlertsContext.Provider
            value={{
                alerts,
                sendAlert,
                removeAlert,
                sendApiErrorAlert
            }}
        >
            {children}
        </AlertsContext.Provider>
    )
}

export const AlertsConsumer: FC = () => {
    return (
        <AlertsContext.Consumer>
            {
                ({ alerts }) => <>
                    {
                        alerts.length > 0
                        ?
                        <div className='alerts'>
                            {alerts.map(a => <Alert {...a} key={a.id} />)}
                        </div>
                        : null
                    }
                </>
            }
        </AlertsContext.Consumer>
    )
}