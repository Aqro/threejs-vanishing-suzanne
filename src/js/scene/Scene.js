import { BoxGeometry, Color, Mesh, MeshMatcapMaterial, Scene as _Scene, SphereGeometry, Vector2, Vector3 } from 'three'
import { ev, loadTexture, modelLoader } from '@utils'


/* Components
--------------------------------------------------------- */
import ParticleSystem from '@comps/ParticleSystem'
import InstancedMeshSystem from '@comps/InstancedMeshSystem'


/* Material
--------------------------------------------------------- */

// import CustomMaterial from '@mat/template-material'
import LokiMaterial from '@mat/loki-material'
import PARAMS from '../Params'




/* Scene
---------------------------------------------------------------------------------------------------- */

export default class Scene extends _Scene {

    constructor() {
        super()

        this.preload().then(() => {
            this.initMaterials()
            this.initScene()
        })
    }

    async preload() {
        this.store = {
            obsidian: await loadTexture('dist/img/obsidian.jpg'),
            suzanne : await modelLoader('dist/models/suzanne.glb').then((m) => m.children[0]),
        }
    }

    initMaterials() {
        const {
            progress,
            baseNoiseIteration,
            noiseDiffusion,
            mainColor,
            noisePrecision,
            lightningThickness,
            lightningPower,
            lightningDiffusion,
            vanishDirection,
        } = PARAMS


        this.material = new LokiMaterial({
            matcap: { value: this.store.obsidian },
            progress,
            baseNoiseIteration,
            noisePrecision,
            size: { value: new Vector3() },
            color: { value: new Color(mainColor) },
            noiseDiffusion,
            lightningThickness,
            lightningPower,
            lightningDiffusion,
            vanishDirection,
            time: { value: 0 },
        })

        // this.material = new MeshMatcapMaterial({
        //     matcap: this.store.obsidian,
        // })
    }

    initScene() {
        const geom = this.store.suzanne.geometry.clone()
        geom.computeBoundingBox()

        const size = new Vector3()
        geom.boundingBox.getSize(size)

        this.mesh = new Mesh(geom, this.material)

        this.material.uniforms.size.value.copy(size)
        this.particles = new ParticleSystem(this.store)
        // this.mesh = new InstancedMeshSystem()

        this.add(this.mesh, this.particles)
    }

    /* Handlers
    --------------------------------------------------------- */



    /* Actions
    --------------------------------------------------------- */

    update() {
        ev('scene:update')
    }


    /* Values
    --------------------------------------------------------- */



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */
