import { WebGLRenderer } from 'three'
import gsap from 'gsap'

const BG = 0x232329


/* RENDERER
---------------------------------------------------------------------------------------------------- */

export default class Renderer extends WebGLRenderer {

    constructor($canvas, loopFunction = () => {}) {
        const { W, H, PR } = APP.Layout

        super({
            canvas: $canvas,
            antialias: false,

            powerPreference: 'high-performance',
        })


        this.$canvas = $canvas

        this.setClearColor(BG)
        this.setSize(W, H)
        this.setPixelRatio(PR)

        this.loopHandler = loopFunction

        this.bindEvents()
    }


    bindEvents() {
        document.addEventListener('layoutChange', () => this.onResize())
    }



    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        const { W, H } = APP.Layout

        this.setSize(W, H)
    }



    /* Actions
    --------------------------------------------------------- */

    toggleRender(shouldRender) {
        const renderLoop = shouldRender ? this.loopHandler : null

        // this.setAnimationLoop(renderLoop)
        if (shouldRender) {
            gsap.ticker.add(this.loopHandler)
        } else {
            gsap.ticker.remove(this.loopHandler)
        }
    }

    /* Values
    --------------------------------------------------------- */



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */
