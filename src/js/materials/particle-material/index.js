import gsap from 'gsap'
import { AdditiveBlending, Clock, RawShaderMaterial } from 'three'
import vertexShader from './vertex.vs.glsl'
import fragmentShader from './fragment.fs.glsl'

export default class ParticleMaterial extends RawShaderMaterial {

    constructor(uniforms = {}) {
        super({
            vertexShader,
            fragmentShader,

            transparent: true,
            // blending: AdditiveBlending,
            depthWrite: false,
            // depthTest: false,
        })

        this.uniforms = uniforms
        this.clock = new Clock()

        this.bindEvents()
    }

    bindEvents() {
        document.addEventListener('colorUpdate', (e) => this.onUpdateColor(e.detail))
        document.addEventListener('scene:update', () => this.onUpdate())
    }


    onUpdateColor({ color }) {
        this.uniforms.color.value.set(color)

        this.uniformsNeedUpdate = true
    }

    onUpdate() {
        this.uniforms.time.value += this.clock.getDelta()
        // this.uniforms.direction.value += (this.uniforms.progress.value - this.uniforms.prevDirection.value) * 0.9

        gsap.to(this.uniforms.speed, {
            value: (this.uniforms.progress.value - this.uniforms.prevDirection.value),
            ease: 'power4.out',
            duration: 1.2,
            overwrite: true,
        })

        this.uniforms.prevDirection.value = this.uniforms.progress.value
    }

}
