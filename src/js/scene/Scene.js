import { BoxGeometry, Mesh, Scene as _Scene } from 'three'
import { ev } from '@utils'


/* Components
--------------------------------------------------------- */
import ParticleSystem from '@comps/ParticleSystem'
import InstancedMeshSystem from '@comps/InstancedMeshSystem'


/* Material
--------------------------------------------------------- */

import CustomMaterial from '@mat/template-material'




/* Scene
---------------------------------------------------------------------------------------------------- */

export default class Scene extends _Scene {

    constructor() {
        super()

        this.initMaterials()
        this.initScene()
    }

    initMaterials() {
        this.material = new CustomMaterial()
    }

    initScene() {
        // this.mesh = new Mesh(new BoxGeometry(), this.material)
        // this.mesh = new ParticleSystem()
        this.mesh = new InstancedMeshSystem()

        this.add(this.mesh)
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
