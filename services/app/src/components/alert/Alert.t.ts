export type AlertProps = {
    message: string,
    status?: AlertStatus,
    withConfetti?: boolean,
    remove: () => void
}

export enum AlertStatus {
    Success = 'success',
    Error = 'error'
}