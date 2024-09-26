import { EnumMatcher } from "./enums"

export type TypeOrNullOrUndefined<T> = T | null | undefined
export type TypeOrArrayOrNull<T> = T | T[] | null
export type TypeOrArrayOrNullOrUndefined<T> = T | T[] | null | undefined

export function enumOrArrayOrNullToApiArray <Enum extends string> (input: TypeOrArrayOrNullOrUndefined<Enum>, matcher: EnumMatcher<Enum, string, string | undefined>) {
    if (input === undefined || input === null) return undefined
    if (typeof input === 'string') return [matcher.match(input)] as string[]
    if (input.filter(i => i !== undefined).length === 0) return undefined
    return input.map(i => matcher.match(i)).filter(i => i !== undefined) as string[]
}