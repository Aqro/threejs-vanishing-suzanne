import { BufferGeometry, Float32BufferAttribute, Mesh, Sprite, SpriteMaterial, Texture } from 'three'
const events = {}

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
    if (!(eventName in events)) {
        const e = new CustomEvent(eventName, { detail: data }, { once })
        document.dispatchEvent(e)

        events[eventName] = e
    } else {
        const e = events[eventName]
        document.dispatchEvent(e)
    }
}

export const bigTriangle = (material) => {
    const geometry = new BufferGeometry()

    // Triangle expressed in clip space coordinates
    const vertices = [
        -1.0, -1.0,
        3.0, -1.0,
        -1.0, 3.0,
    ]

    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 2))

    const triangle = new Mesh(geometry, material)
    triangle.frustumCulled = false

    return triangle
}


export const makeTextSprite = (message, parameters = {}) => {

    const fontface = parameters.hasOwnProperty('fontface') ? parameters.fontface : 'Arial'
    const fontsize = parameters.hasOwnProperty('fontsize') ? parameters.fontsize : 18
    const borderThickness = parameters.hasOwnProperty('borderThickness') ? parameters.borderThickness : 4
    const borderColor = parameters.hasOwnProperty('borderColor') ? parameters.borderColor : { r:0, g:0, b:0, a:1.0 }
    const backgroundColor = parameters.hasOwnProperty('backgroundColor') ? parameters.backgroundColor : { r:255, g:255, b:255, a:1.0 }
    const textColor = parameters.hasOwnProperty('textColor') ? parameters.textColor : { r:0, g:0, b:0, a:1.0 }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.font = `Bold ${fontsize}px ${fontface}`
    const metrics = context.measureText(message)
    const textWidth = metrics.width

    context.fillStyle   = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`
    context.strokeStyle = `rgba(${borderColor.r},${borderColor.g},${borderColor.b},${borderColor.a})`

    context.lineWidth = borderThickness
    roundRect(context, borderThickness / 2, borderThickness / 2, (textWidth + borderThickness) * 1.1, fontsize * 1.4 + borderThickness, 8)

    context.fillStyle = `rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, 1.0)`
    context.fillText(message, borderThickness, fontsize + borderThickness)

    const texture = new Texture(canvas)
    texture.needsUpdate = true

    const spriteMaterial = new SpriteMaterial({ map: texture, useScreenCoordinates: false })
    const sprite = new Sprite(spriteMaterial)
    sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize)
    return sprite
}

// const roundRect = (ctx, x, y, width, height, radius = 5, fill, stroke = true) => {
//     if (typeof radius === 'number') {
//         radius = { tl: radius, tr: radius, br: radius, bl: radius }
//     } else {
//         const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 }
//         for (const side in defaultRadius) {
//             radius[side] = radius[side] || defaultRadius[side]
//         }
//     }
//     ctx.beginPath()
//     ctx.moveTo(x + radius.tl, y)
//     ctx.lineTo(x + width - radius.tr, y)
//     ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr)
//     ctx.lineTo(x + width, y + height - radius.br)
//     ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height)
//     ctx.lineTo(x + radius.bl, y + height)
//     ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl)
//     ctx.lineTo(x, y + radius.tl)
//     ctx.quadraticCurveTo(x, y, x + radius.tl, y)
//     ctx.closePath()
//     if (fill) {
//         ctx.fill()
//     }
//     if (stroke) {
//         ctx.stroke()
//     }
// }


export const getStyle = (el, property) => window.getComputedStyle(el).getPropertyValue(property)
