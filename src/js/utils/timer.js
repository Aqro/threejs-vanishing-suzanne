

/* TIMER FOR HERO
---------------------------------------------------------------------------------------------------- */

export default class Timer {

    constructor(...props) {
        this.timer = null

        if (props.length) {
            const [callback, delay] = props
            this.start(callback, delay)
        }
    }

    start(callback, delay) {
        this.callback = callback
        this.remaining = delay
        this.delay = delay

        this.restartTimer()
    }

    stop() {
        clearTimeout(this.timer)
    }

    pause() {
        clearTimeout(this.timer)
        this.remaining -= Date.now() - this.start
        this.paused = true
    }

    restartTimer(delay = this.delay) {
        this.start = Date.now()
        clearTimeout(this.timer)
        this.timer = setTimeout(this.callback, delay)
        this.paused = false
    }

    resume() {
        this.restartTimer(this.remaining)
    }

}
