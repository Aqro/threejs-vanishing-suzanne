export const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val))

export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const map = (value, min1, max1, min2, max2) => min2 + (max2 - min2) * (value - min1) / (max1 - min1)

export const getPos = ({ changedTouches, clientX, clientY, target }) => {
    const x = changedTouches ? changedTouches[0].clientX : clientX
    const y = changedTouches ? changedTouches[0].clientY : clientY

    return {
        x, y, target,
    }
}

export const wrap = (el, wrapper) => {
    el.parentNode.insertBefore(wrapper, el)
    wrapper.appendChild(el)
}

export const unwrap = (content) => {
    for (let i = 0; i < content.length; i++) {
        const el     = content[i]
        const parent = el.parentNode

        if (parent.parentNode) parent.outerHTML = el.innerHTML
    }
}

export const ev = (eventName, data, once = false) => {
    const e = new CustomEvent(eventName, { detail: data }, { once })
    document.dispatchEvent(e)
}

export const getStyle = (el, property) => window.getComputedStyle(el).getPropertyValue(property)
