import { HalfFloatType } from 'three'
import { GPUComputationRenderer as GPUC } from 'three/examples/jsm/misc/GPUComputationRenderer'

import testFragmentShader from '@gpu/test-variable.fs.glsl'

const SIZE = 256 // Must be PO2

/* TITLE
---------------------------------------------------------------------------------------------------- */

export default class GPUComputationRenderer extends GPUC {

    constructor(renderer) {
        super(SIZE, SIZE, renderer)

        if (APP.Browser.isSafari) {
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

        this.bindHandlers()
        this.bindEvents()
    }

    bindHandlers() {
        this.updateHandler = () => this.onUpdate()
    }

    bindEvents() {
        document.addEventListener('scene:update', this.updateHandler)
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
