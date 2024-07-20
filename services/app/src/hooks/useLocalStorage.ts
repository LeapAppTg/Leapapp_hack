import { useEffect,useState } from 'react'

export const useLocalStorage = (key: string) => {
    const [value, setValue] = useState<string | null>(() => {
        const stored = localStorage.getItem(key)

        return stored    
    })

    useEffect(() => {
        if (value) {
            localStorage.setItem(key, value)
        } else {
            localStorage.removeItem(key)
        }
    }, [value])

    return [value, setValue] as const
}