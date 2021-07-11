import { RawShaderMaterial } from 'three'
import vertexShader from './vertex.vs.glsl'
import fragmentShader from './fragment.fs.glsl'

export default class ParticleMaterial extends RawShaderMaterial {

    constructor(uniforms = {}) {
        super({
            vertexShader,
            fragmentShader,

            // transparent: true,
        })

        this.uniforms = uniforms
    }

}
