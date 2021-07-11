import { PerspectiveCamera, OrthographicCamera, Vector3 } from 'three'


// const perspective = 800
// const fov = (180 * (2 * Math.atan(H / 2 / perspective))) / Math.PI
const fov = 50
// const frustumSize = 10
// const frustrumAspect = frustumSize * aspect / 2



/* CAMERA
---------------------------------------------------------------------------------------------------- */

export default class Camera extends PerspectiveCamera {

    constructor() {
        const { W, H } = APP.Layout
        const aspect = W / H

        super(fov, aspect, 0.1, 10)
        // super(-frustrumAspect, frustrumAspect, frustrumAspect, -frustrumAspect, 1, 100)

        this.position.set(2, 2, 3)
        this.lookAt(new Vector3())

        this.bindEvents()
    }


    bindEvents() {
        document.addEventListener('layoutChange', () => this.onResize())
    }




    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        const { W, H } = APP.Layout

        this.aspect = W / H
        this.updateProjectionMatrix()
    }


    /* Actions
    --------------------------------------------------------- */



    /* Values
    --------------------------------------------------------- */



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */
