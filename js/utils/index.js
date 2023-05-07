export const getLocalStorageValue = (key, initialValue) => {
    if (localStorage.getItem(key) == null) {
        if (typeof initialValue == 'function') {
            localStorage.setItem(key, JSON.stringify(initialValue()))
            return initialValue()
        }
        else{
            localStorage.setItem(key, JSON.stringify(initialValue))
            return initialValue
        }
    }
    else{
        return JSON.parse(localStorage.getItem(key));
    }
}

export const setLocalStorageValue = (key, value) => {
    const currentValue = getLocalStorageValue(key, null);
    let functionValue;
    if (typeof value == 'function') {
        functionValue = value(currentValue)
        localStorage.setItem(key, JSON.stringify(functionValue))
    }
    else{
        localStorage.setItem(key, JSON.stringify(value))
    }

    const  localStorageEvent = new CustomEvent('localstorage', {detail: typeof value == 'function' ? functionValue : value})
    window.dispatchEvent(localStorageEvent)
    return typeof value == 'function' ? functionValue : value
}


















export const copyLink = (text) => {
    navigator.clipboard.writeText(text)

    const CopyEvent = new CustomEvent('copylink', { detail: text })
    window.dispatchEvent(CopyEvent)
}