import { ev, getPos } from '@utils'

export default class Layout {

    constructor() {
        this.onResize()

        this.resizeTimer = null
        this.isResizing  = false

        this.bindEvents()
    }

    bindEvents() {
        window.addEventListener('resize', () => this.onDelayedResize())
        window.addEventListener('wheel', (e) => { this.onScroll(e) }, { passive: false })
        window.addEventListener('scroll', (e) => { this.onScroll(e) })
        document.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false })

        document.body.addEventListener('mousemove', (e) => this.onMove(e))
    }

    onResize() {
        this.isMobile  = window.matchMedia('(max-width: 767px)').matches

        this.W = window.innerWidth
        this.H = window.innerHeight
        this.PR = Math.min(window.devicePixelRatio, 1.5 || 1)

        this.isResizing = false

        ev('layoutChange')
    }

    onDelayedResize() {
        this.isResizing = true
        if (this.resizeTimer) clearTimeout(this.resizeTimer)

        this.resizeTimer = setTimeout(() => this.onResize(), 200)
    }

    onTouchMove(e) {
        e.preventDefault()
    }

    onScroll(e) {
        e.preventDefault()
    }

    onMove(e) {
        const { x, y } = getPos(e)
        const { W, H } = this

        const nx = (x / W) * 2 - 1
        const ny = -(y / H) * 2 + 1

        ev('layout:pointerMove', { x, y, nx, ny })
    }

}
