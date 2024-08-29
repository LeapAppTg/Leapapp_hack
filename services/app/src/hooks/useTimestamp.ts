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
      const interval = window.setInterval(() => setTimestamp(currentUnixTimestamp()), 500)
    
      return () => window.clearInterval(interval)
    }, [])
    
    return timestamp

}

export const useCountdown = (timeEnd: Date | number) => {

  const endTimestamp = useMemo(() => typeof timeEnd === 'number' ? timeEnd : timeEnd.getTime(), [timeEnd])
  const timestamp = useCurrentTimestamp()

  const timeLeft = useMemo(() => {
      return TimeObject.fromTimestamp(endTimestamp - timestamp)
  }, [timestamp, endTimestamp])

  return { timeLeft }
}

export const useUnixCountdown = (timeEnd: number) => {

    const timestamp = useUnixTimestamp()

    const timeLeft = useMemo(() => {
        return TimeObject.fromTimestamp((timeEnd - timestamp) * 1000)
    }, [timestamp, timeEnd])

    return { timeLeft }
}