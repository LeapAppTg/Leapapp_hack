import { ElementRef, useEffect, useRef } from "react";

export function usePagination (
    setSize: (size: number | ((_size: number) => number)) => any,
    isValidating: boolean,
    isReachedEnd: boolean
) {
    const ref = useRef<ElementRef<"div">>(null)

    const onScroll = () => {
        if (ref.current === null || ref.current.getBoundingClientRect().bottom > window.innerHeight) return
        if (isValidating || isReachedEnd) return
        setSize(prev => prev + 1)
    }

    useEffect(() => {
        onScroll()
        document.body.addEventListener('touchmove', onScroll)
        document.body.addEventListener('wheel', onScroll)
        
        return () => {
            document.body.removeEventListener('touchmove', onScroll)
            document.body.removeEventListener('wheel', onScroll)
        }
    }, [ref.current, isValidating, isReachedEnd])

    return ref
}