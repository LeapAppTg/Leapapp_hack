function defaultFormat (number: number, shownDecimals: number = 0) {
    return new Intl.NumberFormat("en-US", { minimumFractionDigits: shownDecimals, maximumFractionDigits: shownDecimals })
        .format(number)
}

function shortFormat (number: number, minCroppedValue: number = 999_999) {
    if (number > minCroppedValue) return new Intl.NumberFormat("en-US", { notation: 'compact', maximumFractionDigits: 1 })
        .format(number)
    return defaultFormat(number)
}

export {}

declare global {
    export interface Number {
        format (this: number, format?: "short" | "default", shownDecimals?: number, minCroppedValue?: number): string;
    }
}
Number.prototype.format = function format (format: "short" | "default" = "default", shownDecimals?: number, minCroppedValue?: number) {
    if (format === "short") return shortFormat(this, minCroppedValue)
    return defaultFormat(this, shownDecimals)
}