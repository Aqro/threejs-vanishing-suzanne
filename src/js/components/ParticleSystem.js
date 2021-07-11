import { BufferGeometry, Object3D, MathUtils, Points, Float32BufferAttribute, Color } from 'three'

import ParticleMaterial from '@mat/particle-material'


const MAX_PARTICLES = 50


/* PARTICLE SYSTEM
---------------------------------------------------------------------------------------------------- */


export default class ParticleSystem extends Object3D {

    constructor() {
        super()

        this.init().then(() => {
            this.initMaterial()
            this.initSystem()
        })
    }

    async init() {
        // Load async things
    }


    initMaterial() {
        this.mat = new ParticleMaterial()
    }


    initSystem() {
        const geom = new BufferGeometry()
        const vertices = []
        const sizes = []
        const colors = []

        for (let i = 0; i < MAX_PARTICLES; i++) {
            const x = MathUtils.randFloatSpread(2)
            const y = MathUtils.randFloatSpread(2)
            const z = MathUtils.randFloatSpread(2)

            const scale = MathUtils.randFloat(0.5, 1)
            const color = new Color().setHSL(Math.random(), 1, 0.5)

            vertices.push(x, y, z)
            sizes.push(scale)
            colors.push(color.r, color.g, color.b)
        }

        geom.setAttribute('position', new Float32BufferAttribute(vertices, 3))
        geom.setAttribute('size', new Float32BufferAttribute(sizes, 1))
        geom.setAttribute('aColor', new Float32BufferAttribute(colors, 3))

        const systemMesh = new Points(geom, this.mat)
        systemMesh.frustumCulled = false

        this.add(systemMesh)
    }




    /* Handlers
    --------------------------------------------------------- */



    /* Actions
    --------------------------------------------------------- */



    /* Values
    --------------------------------------------------------- */



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */
