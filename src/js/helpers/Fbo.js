import { LinearFilter, RGBAFormat, RGBFormat, WebGLRenderTarget } from 'three'

/* FrameBuffer Object
---------------------------------------------------------------------------------------------------- */

export default class Fbo {

    constructor(w, h, params = {}) {
        const renderTargetParams = {
            minFilter: LinearFilter,
            magFilter: LinearFilter,
            format: RGBFormat,
            stencilBuffer: false,
            depthBuffer: true,
            generateMipmaps : false,
            ...params,
        }

        this.read = new WebGLRenderTarget(w, h, renderTargetParams)
        this.write = new WebGLRenderTarget(w, h, renderTargetParams)
    }

    swap() {
        const temp = this.read
        this.read  = this.write
        this.write = temp
    }

    setSize(w, h) {
        this.read.setSize(w, h)
        this.write.setSize(w, h)
    }

}

/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */

