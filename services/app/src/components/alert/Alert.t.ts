export type AlertProps = {
    message: string,
    status?: AlertStatus,
    remove: () => void
}

export enum AlertStatus {
    Success = 'success',
    Error = 'error'
}