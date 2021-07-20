import { Vector2, WebGLMultisampleRenderTarget, WebGLRenderTarget } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'



// Passes
// import CustomShaderPass from '@passes/template-pass'
import PARAMS from '@params'



/* POST PROCESSING
---------------------------------------------------------------------------------------------------- */

export default class PostProcessing extends EffectComposer {

    constructor({ renderer: R, scene, camera }) {
        const RTClass = R.getPixelRatio() === 1
            && R.capabilities.isWebGL2
            ? WebGLMultisampleRenderTarget : WebGLRenderTarget

        const RTComposer = new RTClass(1, 1)

        super(R, RTComposer)

        this.scene    = scene
        this.camera   = camera
        this.renderer = R

        this.onResize()

        const renderPass = new RenderPass(scene, camera)
        this.addPass(renderPass)
        this.addCustomPasses()

        this.bindEvents()
    }


    bindEvents() {
        document.addEventListener('layout:change', () => this.onResize())
        document.addEventListener('postUpdate', () => this.onPostNeedUpdate())
    }



    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        const { W, H, PR } = Layout

        this.setSize(W, H)
    }


    onPostNeedUpdate() {
        const { bloom } = PARAMS
        const mod = Browser.isSafari ? 0.5 : 1

        this.bloomPass.strength  = bloom.strength * mod
        this.bloomPass.radius    = bloom.radius * mod
        this.bloomPass.threshold = bloom.threshold * mod
    }

    /* Actions
    --------------------------------------------------------- */

    addCustomPasses() {
        const { W, H, PR } = Layout
        const { isSafari } = Browser
        const { bloom } = PARAMS

        // this.custompass = new CustomShaderPass()

        // this.addPass(this.custompass)

        const modifier = isSafari ? 0.5 : 1


        this.bloomPass = new UnrealBloomPass(
            new Vector2(W * PR, H * PR),
            bloom.strength * modifier,
            bloom.radius * modifier,
            bloom.threshold * modifier,
        )
        this.bloomPass.strength  = bloom.strength * modifier
        this.bloomPass.radius    = bloom.radius * modifier
        this.bloomPass.threshold = bloom.threshold * modifier


        this.addPass(this.bloomPass)

        this.smaaPass = new SMAAPass(W * PR, H * PR)
        this.addPass(this.smaaPass)

        // this.bokehPass = new BokehPass(this.scene, this.camera, {
        //     focus: 1,
        //     aperture: 0.01,
        //     maxblur: 0.01,

        //     width: W,
        //     height: H,
        // })

        // this.addPass(this.bokehPass)
    }


    /* Values
    --------------------------------------------------------- */



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */

// SMAAPass( W * PR, H * PR )

// BokehPass ({
//     focus: 1.0,
//     aperture: 0.025,
//     maxblur: 0.01,

//     width: W,
//     height: H
// })


// UnrealBloomPass( Vector2(W, H), 1.5, 0.4, 0.85 ) // Strength, radius, threshold
