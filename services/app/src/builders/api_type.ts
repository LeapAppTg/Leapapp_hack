import { ApiGetRequestParameter } from "@types"

export class ApiTypeBuilder<InputType, OutputType, Nullable extends boolean = false> {
    private convertHandler: (input: InputType) => Nullable extends true ? OutputType | null : OutputType

    constructor (convertHandler: (input: InputType) => Nullable extends true ? OutputType | null : OutputType) {
        this.convertHandler = convertHandler
    }

    public setConvertHandler (convertHandler: (input: InputType) => Nullable extends true ? OutputType | null : OutputType) {
        this.convertHandler = convertHandler
    }

    public convert (input: InputType) {
        return this.convertHandler(input)
    }
}

export class ApiGetParamsBuilder<InputType extends Record<string, string | string[]>> {
    private defaults?: ApiGetRequestParameter[]

    constructor(defaults?: ApiGetRequestParameter[]) {
        this.defaults = defaults
    }

    public convert(params?: InputType): ApiGetRequestParameter[] {
        const converted = this.defaults ? this.defaults : []
        if (!params) return converted
        return converted.concat(
            Object.keys(params).filter(k => params[k] !== undefined).flatMap(k => {
                const value = params[k]
                if (typeof value === "string") return {
                    key: k,
                    value
                }
                return value.map(value => ({
                    key: k,
                    value
                }))
            })
        )
    }
}