import { BoxGeometry, Color, DynamicDrawUsage, InstancedBufferAttribute, InstancedBufferGeometry, InstancedMesh, MathUtils, MeshNormalMaterial, Object3D, Quaternion, Vector3 } from 'three'

import InstancedMeshMaterial from '@mat/instancedmesh-material'


const MAX_INSTANCES = 50


/* INSTANCED MESH SYSTEM
---------------------------------------------------------------------------------------------------- */

export default class InstancedMeshSystem extends Object3D {

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
        this.mat = new InstancedMeshMaterial()
    }


    initSystem() {
        const instancedGeom = new InstancedBufferGeometry().copy(baseGeometry)

        this.instancedMeshes = new InstancedMesh(instancedGeom, this.mat, MAX_INSTANCES)
        this.instancedMeshes.instanceMatrix.setUsage(DynamicDrawUsage)

        this.updateInstanceValues()

        this.add(this.instancedMeshes)
    }



    /* Handlers
    --------------------------------------------------------- */



    /* Actions
    --------------------------------------------------------- */

    updateInstanceValues() {
        const color = new Color()

        for (let i = 0; i < MAX_INSTANCES; i += 1) {
            const x = MathUtils.randFloatSpread(2)
            const y = MathUtils.randFloatSpread(2)
            const z = MathUtils.randFloatSpread(2)

            P.set(x, y, z)

            const q = new Quaternion()
                .setFromAxisAngle(
                    new Vector3().random(),
                    MathUtils.randFloatSpread(Math.PI * 2),
                ).normalize()

            const scale = MathUtils.randFloat(0.5, 2)
            color.setHSL(Math.random(), 1, 0.5)

            D.position.copy(P)
            D.scale.set(scale, scale, scale)
            D.setRotationFromQuaternion(q)

            D.updateMatrix()

            this.instancedMeshes.setMatrixAt(i, D.matrix)
            this.instancedMeshes.setColorAt(i, color)
        }

        // this.instancedMeshes.geometry.setAttribute('aScale', new InstancedBufferAttribute(new Float32Array(scales), 1))


        this.instancedMeshes.instanceMatrix.needsUpdate = true
        this.instancedMeshes.instanceColor.needsUpdate  = true
    }

    /* Values
    --------------------------------------------------------- */



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */

const D = new Object3D()
const P = new Vector3()

const baseGeometry = new BoxGeometry(0.1, 0.1, 0.1)
