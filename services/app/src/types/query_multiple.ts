import { ApiTypeBuilder } from "@builders"

export type QueryMultipleApi<ResultTApi> = {
    next: boolean,
    array?: ResultTApi[]
}

export type QueryMultiple<ResultT> = {
    next: boolean,
    array: ResultT[]
}

export class ApiMultipleQueryTypeBuilder<ResultTApi, ResultT> extends ApiTypeBuilder<QueryMultipleApi<ResultTApi>, QueryMultiple<ResultT>> {
    public constructor(resultBuilder: ApiTypeBuilder<ResultTApi, ResultT>) {
        super(
            (i) => {
                return {
                    next: i.next,
                    array: i.array?.map((r) => resultBuilder.convert(r)) || []
                }
            }
        )
    }
}

export class ApiArrayTypeBuilder<ResultTApi, ResultT> extends ApiTypeBuilder<ResultTApi[], ResultT[]> {
    public constructor(typeBuilder: ApiTypeBuilder<ResultTApi, ResultT>) {
        super(i => i.map(t => typeBuilder.convert(t)))
    }
}