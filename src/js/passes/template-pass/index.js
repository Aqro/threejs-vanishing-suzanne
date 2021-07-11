import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import fragmentShader from './fragment.fs.glsl'


export default class CustomShaderPass extends ShaderPass {

    constructor(uniforms) {
        super(shader(uniforms))
    }

}

const shader = (uniforms = {}) => ({
    uniforms: {
        ...uniforms,
        tDiffuse: { value: null },
    },


    vertexShader: /* glsl */`
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,

    fragmentShader,

})

