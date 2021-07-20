import { Raycaster, Vector3 } from 'three'



/* Raycaster
---------------------------------------------------------------------------------------------------- */


export default class PointerController {

    constructor(camera) {
        this.mouse  = new Vector3()
        this.pmouse = new Vector3()
        this.camera = camera

        this.ray = new Raycaster()
        this.lookupObjects = []

        this.bindHandlers()
        this.bindEvents()
    }


    bindHandlers() {
        this.pointerMoveHandler = (e) => this.onPointerMove(e.detail)
        this.updateHandler = () => this.onUpdate()
    }

    bindEvents() {
        document.addEventListener('layout:pointerMove', this.pointerMoveHandler)
        document.addEventListener('scene:update', this.updateHandler)
    }



    /* Handlers
    --------------------------------------------------------- */

    onPointerMove({ nx, ny }) {
        this.mouse.x = nx
        this.mouse.y = ny

        this.ray.setFromCamera(this.mouse, this.camera)

        const intersects = this.ray.intersectObjects(this.lookupObjects)

        if (!intersects.length) return

        console.log(intersects);
    }

    onUpdate() {
        this.update()
    }



    /* Actions
    --------------------------------------------------------- */

    update() {
        this.pmouse.copy(this.mouse)
    }


    loopup(objects = []) {
        this.lookupObjects = objects
    }

    /* Values
    --------------------------------------------------------- */



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */
