
/* Scene Components
--------------------------------------------------------- */

import Renderer from '@scene/Renderer'
import Scene from '@scene/Scene'
import Camera from '@scene/Camera'
import PostProcessing from '@scene/PostProcessing'



/* Custom Components
--------------------------------------------------------- */

import DebugComponent from '@comps/DebugComponent'



/* Controllers
--------------------------------------------------------- */

import PARAMS from './Params'





export default class Stage {

    constructor() {
        this.$canvas = document.getElementById('stage')

        this.preload().then(() => this.init())
    }


    async preload() {
        // Add asynchronous things like texture or models
    }


    init() {
        this.buildRenderer()
        this.buildCamera()
        this.buildLights()

        this.initScene()
        this.initDebugController()
        this.initPostProcess()

        this.renderer.toggleRender(true)
    }


    buildRenderer() {
        this.renderer = new Renderer(this.$canvas, () => this.render())
    }


    buildCamera() {
        this.camera = new Camera()
    }


    buildLights() {
        // this.lights = new Lights()
        // this.scene.add(this.lights)
    }




    initDebugController() {
        this.DC = new DebugComponent(this)
    }




    initScene() {
        this.scene = new Scene()
    }



    initPostProcess() {
        this.post = new PostProcessing(this)
    }



    /* Actions
    --------------------------------------------------------- */

    render() {
        this.DC.beginStats()
        const { renderer: R, post: P } = this

        this.update()

        if (PARAMS.useBloom) {
            P.render()
        } else {
            R.render(this.scene, this.camera)
        }

        this.DC.endStats()
    }




    /* Values
    --------------------------------------------------------- */

    update() {
        this.DC.update()

        this.scene.update()
    }



}
