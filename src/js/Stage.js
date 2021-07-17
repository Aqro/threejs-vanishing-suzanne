import { ev } from '@utils/index'
import gsap from 'gsap'

/* Scene Components
--------------------------------------------------------- */

import Renderer from '@scene/Renderer'
import Scene from '@scene/Scene'
import Camera from '@scene/Camera'
import PostProcessing from '@scene/PostProcessing'
// import Lights from '@comps/scene/Lights'



/* Custom Components
--------------------------------------------------------- */

// import Fbo from '@comps/Fbo'
import Ray from '@comps/Ray'
import DebugComponent from '@comps/DebugComponent'
// import GPUComputationRenderer from '@scene/GPUComputationRenderer'



/* Controllers
--------------------------------------------------------- */

import PARAMS from './Params'



/* Materials
--------------------------------------------------------- */

// import CustomMaterial from '@mat/template-material'




/* Utils
--------------------------------------------------------- */

// import TextureLoader from './utils/texture-loader'
// import ModelLoader from './utils/model-loader-gltf'




/* Constants & Helpers
--------------------------------------------------------- */




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

        // this.renderStage(500)
        this.renderer.toggleRender(true)

        this.bindEvents()
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
        // this.ray   = new Ray(this.camera)
        this.scene = new Scene()

        // this.gpu = new GPUComputationRenderer(this.renderer)
    }



    initPostProcess() {
        this.post = new PostProcessing(this)
    }



    bindEvents() {
        document.addEventListener('layoutChange', () => this.onResize())
        document.addEventListener('stage:render', (e) => this.onStageRender(e.detail))
    }



    /* Handlers
    --------------------------------------------------------- */

    onResize() {
        this.renderStage()
    }


    onStageRender() {
        this.renderStage()
    }

    renderStage(delay = 100) {
        // this.renderer.toggleRender(true)

        // clearTimeout(this.renderTimer)

        // this.renderTimer = setTimeout(() => {
        //     this.renderer.toggleRender(false)
        // }, delay)
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
