import { Clock, DoubleSide, RawShaderMaterial } from 'three'
import vertexShader from './vertex.vs.glsl'
import fragmentShader from './fragment.fs.glsl'

export default class LokiMaterial extends RawShaderMaterial {

    constructor(uniforms = {}) {
        super({
            vertexShader,
            fragmentShader,

            transparent: true,
            side: DoubleSide,
        })


        this.uniforms = uniforms
        this.clock = new Clock()

        this.bindEvents()
    }

    bindEvents() {
        document.addEventListener('colorUpdate', (e) => this.onUpdateColor(e.detail))
        document.addEventListener('scene:update', () => this.onUpdateTime())
    }


    onUpdateColor({ color }) {
        this.uniforms.color.value.set(color)

        this.uniformsNeedUpdate = true
    }

    onUpdateTime() {
        this.uniforms.time.value += this.clock.getDelta()
    }

}
