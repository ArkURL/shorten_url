function debounce_leading(func: Function, timeout = 1000) {
    let timer: ReturnType<typeof setTimeout> | null = null
    return (...args: any[]) => {
        if (!timer) {
            func.apply(null, args)
        }
        clearTimeout(timer as ReturnType<typeof setTimeout>)
        timer = setTimeout(() => {
            timer = null
        }, timeout)
    }
}

export { debounce_leading }
