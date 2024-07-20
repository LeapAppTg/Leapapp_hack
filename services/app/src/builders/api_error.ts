import { isAxiosError } from "axios"

export class ApiError {
    statusCode: number
    statusTitle: string
    detail?: string

    constructor({
        statusCode, detail
    }: {
        statusCode: number
        detail?: string
    }) {
        this.statusCode = statusCode
        this.statusTitle = ApiError.getTitleFromCode(statusCode)
        this.detail = detail
    }

    public static getTitleFromCode (code: number): string {
        if (code === 400) return 'Sorry Bud'
        if (code === 401) return 'Unauthorized'
        if (code === 403) return 'Forbidden'
        if (code === 404) return 'Not Found'
        if (code === 405) return 'Method Not Allowed'

        return 'Something went wrong'
    }

    public static fromAxiosError (e: any): ApiError {
        if (isAxiosError(e) && e.response) {
            if (e.response.data && typeof e.response.data === 'object' && 'detail' in e.response.data && typeof e.response.data.detail === 'string') {
                return new this({ statusCode: e.response.status, detail: e.response.data.detail })
            } else {
                return new this({ statusCode: e.response.status })
            }
        } else {
            return new this({ statusCode: 400 })
        }
    }

    public static isApiError = (e: any): e is ApiError => {
        if (typeof e !== 'object') return false
        if (!('statusCode' in e)) return false
        if (typeof e.statusCode !== 'number') return false
        if (!('statusTitle' in e)) return false
        if (typeof e.statusTitle !== 'string') return false 
        return true
    }
}