import { Vector2 } from 'three'

const PARAMS = {
    test: 1,
    progress: { value: 0.5 },
    mainColor: 0xffcf79,
    particleDiffusion : { value: 1 },
    baseNoiseIteration : { value: 5 },
    noiseDiffusion : { value: 0.76 },
    noisePrecision : { value: 2.61 },
    lightningDiffusion : { value: 0.01 },

    lightningThickness: { value: 0.79 },
    lightningPower: { value: 0.07 },
    vanishDirection : { value: new Vector2(-1, 0) },

    useBloom : true,

    bloom: {
        strength  : 2,
        radius    : 0.16,
        threshold : 0.7,
    },
}


export default PARAMS
