import { HalfFloatType } from 'three'
import { GPUComputationRenderer as GPUC } from 'three/examples/jsm/misc/GPUComputationRenderer'

import testFragmentShader from '@gpgpu/template-gpgpu.fs.glsl'

const SIZE = 256 // Must be PO2

/* TITLE
---------------------------------------------------------------------------------------------------- */

export default class GPGPUComputation extends GPUC {

    constructor(renderer) {
        super(SIZE, SIZE, renderer)

        if (Browser.isSafari) {
            this.setDataType(HalfFloatType)
        }

        this.textures = {}
        this.textures.test = this.createTexture()

        this.testVarial = this.addVariable('textureTest', testFragmentShader, this.textures.test)

        // this.setVariableDependencies(this.testVarial, [this.testVarial])

        const error = this.init()

        if (error !== null) {
            console.error(error)
        }

        this.bindEvents()
    }


    bindEvents() {
        document.addEventListener('scene:update', () => this.onUpdate())
    }




    /* Handlers
    --------------------------------------------------------- */

    onUpdate() {
        this.compute()
    }

    /* Actions
    --------------------------------------------------------- */



    /* Values
    --------------------------------------------------------- */



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */
