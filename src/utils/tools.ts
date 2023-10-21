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

function validate_url(url: string): boolean {
    const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    return pattern.test(url)
}

export { debounce_leading, validate_url }
