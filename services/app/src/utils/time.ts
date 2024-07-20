import { Tuple } from "@types"

export const currentTimestamp = () => Date.now()

export const currentUnixTimestamp = () => Math.floor(Date.now() / 1000)

type TimerDisplayValues = {
    value: string,
    label: string
}

enum TimeUnit {
    Month = 'month',
    Day = 'day',
    Hour = 'hour',
    Minute = 'minute',
    Second = 'second'
}

function getTimeUnitFromIndex (index: number) {
    if (index === 0) return TimeUnit.Month
    if (index === 1) return TimeUnit.Day
    if (index === 2) return TimeUnit.Hour
    if (index === 3) return TimeUnit.Minute
    return TimeUnit.Second
}

function getIndexFromTimeUnit (timeUnit: TimeUnit) {
    if (timeUnit === TimeUnit.Month) return 0
    if (timeUnit === TimeUnit.Day) return 1
    if (timeUnit === TimeUnit.Hour) return 2
    if (timeUnit === TimeUnit.Minute) return 3
    return 4
}

function getLabelFromTimeUnit (timeUnit: TimeUnit) {
    if (timeUnit === TimeUnit.Month) return 'm'
    if (timeUnit === TimeUnit.Day) return 'd'
    if (timeUnit === TimeUnit.Hour) return 'h'
    if (timeUnit === TimeUnit.Minute) return 'm'
    return 's'
}

function getPreviousTimeUnit (current: TimeUnit) {
    if (current === TimeUnit.Day) return TimeUnit.Month
    if (current === TimeUnit.Hour) return TimeUnit.Day
    if (current === TimeUnit.Minute) return TimeUnit.Hour
    if (current === TimeUnit.Second) return TimeUnit.Minute
    return current
}

export class TimeObject {
    seconds: number
    minutes: number
    hours: number
    days: number
    months: number

    constructor({
        seconds, minutes, hours, days, months
    }: {
        seconds?: number,
        minutes?: number,
        hours?: number,
        days?: number,
        months?: number
    }) {
        this.seconds = seconds || 0
        this.minutes = minutes || 0
        this.hours = hours || 0
        this.days = days || 0
        this.months = months || 0
    }

    public toDisplayString (depth: number = 2) {
        if (depth >= 5) {
            return `${this.months}m ${this.days}d ${this.hours}h ${this.minutes}m ${this.seconds}s`
        } else if (depth === 4) {
            if (this.months) return `${this.months}m ${this.days}d ${this.hours}h ${this.minutes}m`
            else return `${this.days}d ${this.hours}h ${this.minutes}m ${this.seconds}s`
        } else if (depth === 3) {
            if (this.months) return `${this.months}m ${this.days}d ${this.hours}h`
            else if (this.days) return `${this.days}d ${this.hours}h ${this.minutes}m`
            else return `${this.hours}h ${this.minutes}m ${this.seconds}s`
        } else if (depth === 2) {
            if (this.months) return `${this.months}m ${this.days}d`
            else if (this.days) return `${this.days}d ${this.hours}h`
            else if (this.hours) return `${this.hours}h ${this.minutes}m`
            else return `${this.minutes}m ${this.seconds}s`
        } else {
            if (this.months) return `${this.months}m`
            else if (this.days) return `${this.days}d`
            else if (this.hours) return `${this.hours}h`
            else if (this.minutes) return `${this.minutes}m`
            else return `${this.seconds}s`
        }
        return ''
    }

    public toTimerDisplayArray (depth: number = 2, alwaysTwoDigitsInValue: boolean = false): TimerDisplayValues[] {
        const units = [this.months, this.days, this.hours, this.minutes, this.seconds]
        const returnUnits: TimeUnit[] = []

        for (let i = 0; i < units.length; i++) {
            if (units[i] || returnUnits.length > 0) {
                returnUnits.push(getTimeUnitFromIndex(i))
            }
        }

        if (returnUnits.length === 0) returnUnits.push(getTimeUnitFromIndex(9))

        if (returnUnits.length > depth) {
            while (returnUnits.length > depth) {
                returnUnits.pop()
            }
        } else if (returnUnits.length < depth) {
            while (returnUnits.length < depth) {
                returnUnits.unshift(getPreviousTimeUnit(returnUnits[0]))
            }
        }

        return returnUnits.map(u => {
            const value = units[getIndexFromTimeUnit(u)]
            const label = getLabelFromTimeUnit(u)
            return alwaysTwoDigitsInValue ? {
                value: ( value < 10 ? '0' : '') + value.toString(),
                label
            } : {
                value: value.toString(),
                label
            }
        })
    }

    public isZeroed () {
        return this.seconds === 0 && this.minutes === 0 && this.hours === 0 && this.days === 0 && this.months === 0
    }

    public static fromTimestamp(timestamp: number) {
        const oneMonth = 60 * 60 * 24 * 30 * 1000
        const oneDay = 60 * 60 * 24 * 1000
        const oneHour = 60 * 60 * 1000
        const oneMinute = 60 * 1000
        const oneSecond = 1000

        if (timestamp <= 0) return new this({})

        let months = 0
        let days = 0
        let hours = 0
        let minutes = 0
        let seconds = 0

        months = Math.floor(timestamp / oneMonth)
        timestamp -= months * oneMonth

        days = Math.floor(timestamp / oneDay)
        timestamp -= days * oneDay

        hours = Math.floor(timestamp / oneHour)
        timestamp -= hours * oneHour

        minutes = Math.floor(timestamp / oneMinute)
        timestamp -= minutes * oneMinute

        seconds = Math.floor(timestamp / oneSecond) 

        return new this({ months, days, hours, minutes, seconds })
    }
}

const MonthsMap: { [key: number]: Tuple<string, 2>} = {
    0: ['Jan', 'January'],
    1: ['Feb', 'February'],
    2: ['Mar', 'March'],
    3: ['Apr', 'April'],
    4: ['May', 'May'],
    5: ['Jun', 'June'],
    6: ['Jul', 'July'],
    7: ['Aug', 'August'],
    8: ['Sep', 'September'],
    9: ['Oct', 'October'],
    10: ['Nov', 'November'],
    11: ['Dec', 'December']
}

export function monthNumberToString (month: number, fullForm: boolean = false) {
    const pair = MonthsMap[month]
    if (!pair) return ''
    return pair[fullForm ? 1 : 0]
}