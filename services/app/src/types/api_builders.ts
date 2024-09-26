import { ApiGetParamsBuilder, ApiTypeBuilder } from "@builders"

export type ApiGetRequestConstructorParams<Input, Output, Params extends Record<string, string | string[]>> = {
    path?: string,
    typeBuilder: ApiTypeBuilder<Input, Output>
    accessToken?: string,
    paramsBuilder: ApiGetParamsBuilder<Params>,
    params?: Params
}

export type ApiGetRequestParameter = {
    key: string,
    value: string
}

export type ApiPostRequestConstructorParams<ResponseInput, ReponseOutput> = {
    path?: string,
    responseTypeBuilder: ApiTypeBuilder<ResponseInput, ReponseOutput>,
    params?: ApiPostRequestParameters
    accessToken?: string
}

export type ApiPostRequestParameters = {
    [key: string]: string | number | boolean | undefined | string[] | null | any[]
}

export type ApiPostRequestParameter = {
    key: string,
    value: string
}

export type ApiDeleteRequestConstructorParams<ResponseInput, ReponseOutput> = {
    path?: string,
    responseTypeBuilder: ApiTypeBuilder<ResponseInput, ReponseOutput>
    accessToken?: string
}