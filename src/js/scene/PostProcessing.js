import { Vector2, WebGLMultisampleRenderTarget, WebGLRenderTarget } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
// import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'



// Passes
import CustomShaderPass from '@passes/template-pass'
import PARAMS from '../Params'



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
        document.addEventListener('layoutChange', () => this.onResize())
        document.addEventListener('postUpdate', () => this.onPostNeedUpdate())
    }



    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        const { W, H, PR } = APP.Layout

        this.setSize(W, H)
    }


    onPostNeedUpdate() {
        const { bloom } = PARAMS

        this.bloomPass.strength  = bloom.strength
        this.bloomPass.radius    = bloom.radius
        this.bloomPass.threshold = bloom.threshold
    }

    /* Actions
    --------------------------------------------------------- */

    addCustomPasses() {
        const { W, H, PR } = APP.Layout
        const { bloom } = PARAMS

        this.custompass = new CustomShaderPass()

        this.addPass(this.custompass)


        this.smaaPass = new SMAAPass(W * PR, H * PR)
        this.addPass(this.smaaPass)

        this.bloomPass = new UnrealBloomPass(new Vector2(W, H), bloom.strength, bloom.radius, bloom.threshold)
        this.bloomPass.strength  = bloom.strength
        this.bloomPass.radius    = bloom.radius
        this.bloomPass.threshold = bloom.threshold


        this.addPass(this.bloomPass)



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
