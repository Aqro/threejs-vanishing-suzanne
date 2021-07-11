import { Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'



// Passes
import CustomShaderPass from '@passes/template-pass'



/* POST PROCESSING
---------------------------------------------------------------------------------------------------- */

export default class PostProcessing extends EffectComposer {

    constructor({ renderer, scene, camera }) {
        super(renderer)

        this.scene    = scene
        this.camera   = camera
        this.renderer = renderer

        const renderPass = new RenderPass(scene, camera);
        this.addPass(renderPass)
        this.addCustomPasses()

        this.bindEvents()
    }


    bindEvents() {
        document.addEventListener('layoutChange', () => this.onResize())
    }



    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        const { W, H, PR } = APP.Layout

        this.setSize(W, H)
    }



    /* Actions
    --------------------------------------------------------- */

    addCustomPasses() {
        const { W, H, PR } = APP.Layout

        this.custompass = new CustomShaderPass()

        this.addPass(this.custompass)


        this.smaaPass = new SMAAPass(W * PR, H * PR)
        this.addPass(this.smaaPass)

        // this.bloomPass = new UnrealBloomPass(new Vector2(W, H), 0.8, 0.1, 0.5)
        // this.addPass(this.bloomPass)

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
