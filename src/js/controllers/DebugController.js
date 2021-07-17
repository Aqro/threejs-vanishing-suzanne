import Stats from 'stats.js'
import { Pane } from 'tweakpane'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ev } from '@utils/index'
// import { Color, Vector3 } from 'three'
// import gsap from 'gsap'

const defaultPreview = {
    previewSize: 256,
}

class DebugController {

    constructor(obj, {
        stats = false,
        gui = false,
        control = false,
        preview = false,
        renderOnControl = false,
        previewParams = {},
    } = {}) {
        this.Stage = obj

        this.params = { stats, gui, control, preview, renderOnControl }
        this.previewParams = Object.assign(defaultPreview, previewParams)

        if (stats) this.initStats()
        if (gui) this.initGUI()
        if (control) this.initOrbitControl()
        if (preview) this.initPreview(this.previewParams)
    }


    /* Init
    --------------------------------------------------------- */


    initStats() {
        this.stats = new Stats()
        this.stats.showPanel(0)

        document.body.appendChild(this.stats.dom)
    }

    initGUI() {
        this.gui = new Pane()
    }

    initOrbitControl() {
        this.controls = new OrbitControls(
            this.Stage.camera,
            this.Stage.renderer.domElement,
        )
        this.controls.enableKeys = false
        this.controls.enableDamping = true
        // this.controls.enableZoom = false
        this.controls.minDistance = APP.Browser.isSafariDesktop ? 4 : 2.5
        this.controls.maxDistance = 9
        this.controls.update()

        if (!this.params.renderOnControl) return

        this.controls.addEventListener('change', (e) => {
            ev('stage:render')
        })
    }


    initPreview({ previewSize }) {
        const { PR } = APP.Layout

        this.preview = document.createElement('canvas')
        this.ctx = this.preview.getContext('2d')
        this.preview.width = previewSize
        this.preview.height = previewSize
        this.preview.style.position = 'absolute'
        this.preview.style.left = '0px'
        this.preview.style.top = '0px'
        this.preview.style.pointerEvents = 'none'
        this.preview.style.zIndex = '100'
        this.preview.style.width = previewSize * PR
        this.preview.style.height = previewSize * PR


        document.body.appendChild(this.preview)
    }



    /* Update
    --------------------------------------------------------- */


    beginStats() {
        if (!this.params.stats) return
        this.stats.begin()
    }

    update() {
        if (!this.params.control) return

        this.controls.update()
    }

    endStats() {
        if (!this.params.stats) return

        this.stats.end()
    }

    previewBuffer(scene, cam) {
        if (!this.params.preview) return

        if (this.params.preview && !this.hasPreview) {
            this.hasPreview = true
            this.stats.dom.style.left = `${this.previewParams.previewSize}px`
        }

        const { W, H } = APP.Layout
        const { renderer: R } = this.Stage
        const { previewSize } = this.previewParams

        R.render(scene, cam)

        const ratio = W / H
        const sclX = (R.domElement.width / W) * ratio
        const sclY = R.domElement.height / H

        this.ctx.clearRect(0, 0, previewSize, previewSize)
        this.ctx.drawImage(R.domElement, -previewSize * sclX * 0.5 + previewSize * 0.5, -previewSize * sclY + previewSize, previewSize * sclX, previewSize * sclY)
    }


}


const createDebugController = (obj, params) => new DebugController(obj, params)


export default DebugController
export { createDebugController as debugController }
