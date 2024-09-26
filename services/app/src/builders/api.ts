import { ApiError, ApiGetParamsBuilder, ApiTypeBuilder } from "@builders"
import { API_URL } from "@constants"
import { ApiDeleteRequestConstructorParams, ApiGetRequestConstructorParams, ApiPostRequestConstructorParams, ApiPostRequestParameters } from "@types"
import axios from 'axios'

export class ApiGetRequestBuilder<
    Input, Output, Params extends Record<string, string | string[]>
> {
    private path?: string
    private accessToken: string | null
    private typeBuilder: ApiTypeBuilder<Input, Output>
    private paramsBuilder: ApiGetParamsBuilder<Params>
    private params?: Params

    constructor ({ paramsBuilder, path, accessToken, typeBuilder, params }: ApiGetRequestConstructorParams<Input, Output, Params>) {
        this.path = path
        this.typeBuilder = typeBuilder
        this.accessToken = accessToken || null
        this.paramsBuilder = paramsBuilder
        this.params = params
    }

    public setTypeBuilder (typeBuilder: ApiTypeBuilder<Input, Output>) {
        this.typeBuilder = typeBuilder
        return this
    }

    public setAccessToken(accessToken?: string | null) {
        if (accessToken) this.accessToken = accessToken
        return this
    }

    public setParams(params: Params) {
        this.params = params
        return this
    }

    public setPath(path: string) {
        this.path = path
        return this
    }

    public createUrl() {
        const link = new URL(this.path || '', API_URL)

        this.paramsBuilder.convert(this.params).forEach(({ key, value }) => {
            link.searchParams.append(key, value)
        })

        return link.toString()
    }

    public createRawUrl() {
        let link = API_URL + '/' + this.path
        const params = this.paramsBuilder.convert(this.params)
        
        if (params.length > 0) link = link + '/'

        params.forEach(({ key, value }) => {
            link = link + `?${key}=${value}`
        })

        return link
    }

    public async sendRequest() {
        return axios
            .get(this.createUrl(), {
                headers: {
                    "Authorization": `Bearer ${this.accessToken}`
                }
            })
            .then(r => this.typeBuilder.convert(r.data))
            .catch(e => {
                throw ApiError.fromAxiosError(e)
            })
    }
}

export class ApiPostRequestBuilder<
    ResponseInput, ResponseOutput
> {
    private path?: string
    private responseTypeBuilder: ApiTypeBuilder<ResponseInput, ResponseOutput>
    private params?: ApiPostRequestParameters
    private accessToken: string | null

    constructor ({ params, path, accessToken, responseTypeBuilder }: ApiPostRequestConstructorParams<ResponseInput, ResponseOutput>) {
        this.path = path
        this.params = params
        this.accessToken = accessToken || null
        this.responseTypeBuilder = responseTypeBuilder
    }

    public setAccessToken(accessToken: string | null | undefined) {
        if (accessToken) {
            this.accessToken = accessToken
        }
        return this
    }

    public setResponseTypeBuilder (typeBuilder: ApiTypeBuilder<ResponseInput, ResponseOutput>) {
        this.responseTypeBuilder = typeBuilder
        return this
    }

    public setParams(params: ApiPostRequestParameters) {
        this.params = params
        return this
    }

    public setPath(path: string) {
        this.path = path
        return this
    }

    public createUrl() {
        const link = new URL(this.path || '', API_URL)

        return link.toString()
    }

    public async sendRequest() {
        return axios
            .post(
                this.createUrl(),
                this.params,
                {
                    headers: {
                        "Authorization": `Bearer ${this.accessToken}`
                    }
                }
            )
            .then(r => this.responseTypeBuilder.convert(r.data))
            .catch(e => {
                throw ApiError.fromAxiosError(e)
            })
    }
}

export class ApiDeleteRequestBuilder<
    ResponseInput, ResponseOutput
> {
    private path?: string
    private responseTypeBuilder: ApiTypeBuilder<ResponseInput, ResponseOutput>
    private accessToken: string | null

    constructor ({ path, accessToken, responseTypeBuilder }: ApiDeleteRequestConstructorParams<ResponseInput, ResponseOutput>) {
        this.path = path
        this.accessToken = accessToken ? `Bearer ${accessToken}` : null
        this.responseTypeBuilder = responseTypeBuilder
    }

    public setAccessToken(accessToken: string) {
        this.accessToken = `Bearer ${accessToken}`
    }

    public setResponseTypeBuilder (typeBuilder: ApiTypeBuilder<ResponseInput, ResponseOutput>) {
        this.responseTypeBuilder = typeBuilder
    }

    public setPath(path: string) {
        this.path = path
    }

    public createUrl() {
        const link = new URL(this.path || '', API_URL)

        return link.toString()
    }

    public async sendRequest() {
        return axios
            .delete(
                this.createUrl(),
                {
                    headers: {
                        "Authorization": this.accessToken
                    }
                }
            )
            .then(r => this.responseTypeBuilder.convert(r.data))
            .catch(e => {
                throw ApiError.fromAxiosError(e)
            })
    }
}