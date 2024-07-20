import { ApiTypeBuilder } from "@builders"

export type QueryMultipleApi<ResultTApi> = {
    count: string | null,
    next: string | null,
    previous: string | null,
    results?: ResultTApi[]
}

export type QueryMultiple<ResultT> = {
    count: number | null,
    nextRequest: string | null,
    previousRequest: string | null,
    results: ResultT[]
}

export class ApiMultipleQueryTypeBuilder<ResultTApi, ResultT> extends ApiTypeBuilder<QueryMultipleApi<ResultTApi>, QueryMultiple<ResultT>> {
    public constructor(resultBuilder: ApiTypeBuilder<ResultTApi, ResultT>) {
        super(
            (i) => {
                return {
                    count: i.count ? Number(i.count) : null,
                    nextRequest: i.next || null,
                    previousRequest: i.previous || null,
                    results: i.results?.map((r) => resultBuilder.convert(r)) || []
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