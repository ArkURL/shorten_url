import type { debounceFunction } from "@/d.ts/debounceFunction"

function debounce_leading(func: debounceFunction, timeout = 1000) {
    let timer: ReturnType<typeof setTimeout> | null = null
    return <T>(...args: T[]) => {
        if (!timer) {
            func(...args)
        }
        clearTimeout(timer as ReturnType<typeof setTimeout>)
        timer = setTimeout(() => {
            timer = null
        }, timeout)
    }
}

export { debounce_leading }
