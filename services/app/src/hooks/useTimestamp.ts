import { currentTimestamp, currentUnixTimestamp, TimeObject } from "@utils"
import { useEffect, useMemo } from "react"
import { useState } from "react"

export const useCurrentTimestamp = () => {

    const [timestamp, setTimestamp] = useState<number>(currentTimestamp())

    useEffect(() => {
      const interval = window.setInterval(() => setTimestamp(currentTimestamp()), 500)
    
      return () => window.clearInterval(interval)
    }, [])
    
    return timestamp

}

export const useUnixTimestamp = () => {

    const [timestamp, setTimestamp] = useState<number>(currentUnixTimestamp())

    useEffect(() => {
      const interval = window.setInterval(() => setTimestamp(currentUnixTimestamp()), 1000)
    
      return () => window.clearInterval(interval)
    }, [])
    
    return timestamp

}

export const useCountdown = (timeEnd: Date | number) => {

    const [endTimestamp] = useState(typeof timeEnd === 'number' ? timeEnd : timeEnd.getTime())
    const timestamp = useCurrentTimestamp()

    const timeLeft = useMemo(() => {
        return TimeObject.fromTimestamp(endTimestamp - timestamp)
    }, [timestamp])

    return { timeLeft }
}