import gsap from 'gsap'

import DebugController from '@ctrl/DebugController'
import { ev } from '@utils/'
import PARAMS from '../Params'



/* DEBUG COMPONENT
---------------------------------------------------------------------------------------------------- */


export default class DebugComponent {

    constructor(Stage) {
        this.Stage = Stage
        this.initController()
    }



    initController() {
        this.controller = new DebugController(this.Stage, {
            stats   : true,
            gui     : true,
            control : true,
            // renderOnControl: true,
        })

        const params = this.controller.gui.addFolder({
            title: 'Params',
            expanded : !APP.Browser.isMobile,
        })

        // this.DC.gui.on('change', () => this.renderStage())

        params.addInput(PARAMS.progress, 'value', {
            label: 'Progress',
            min: 0,
            max: 1,
            step: 0.00001,
        })

        params.addInput(PARAMS.vanishDirection, 'value', {
            label: 'Vanish Direction',
            picker: 'inline',
            expanded: true,
            step: 0.00001,
            x: { min: -1, max: 1 },
            y: { min: -1, max: 1 },
            z: { min: -1, max: 1 },
        })

        params.addSeparator()

        params.addInput(PARAMS.baseNoiseIteration, 'value', {
            label: 'Noise Max iteration',
            min: 1,
            max: APP.Browser.isSafariDesktop ? 2 : 5,
            step: 1,
        })

        params.addInput(PARAMS.noiseDiffusion, 'value', {
            label: 'Noise diffusion',
            min: 0,
            max: 1,
        })

        params.addInput(PARAMS.noisePrecision, 'value', {
            label: 'Noise precision',
            min: 0,
            max: 4,
        })

        params.addSeparator()

        params.addInput(PARAMS.lightningThickness, 'value', {
            label: 'Light Thickness',
            min: 0,
            max: 1,
        })

        params.addInput(PARAMS.lightningPower, 'value', {
            label: 'Light Intensity',
            min: 0,
            max: 0.3,
        })

        params.addInput(PARAMS.lightningDiffusion, 'value', {
            label: 'Light Diffusion',
            min: 0,
            max: 0.03,
        })

        params.addInput(PARAMS, 'mainColor', {
            label: 'Color',
            view: 'color',
        }).on('change', ({ value }) => {
            ev('colorUpdate', { color: value })
        })

        // const bloom = params.addFolder({
        //     title: 'Bloom',
        // })

        params.addSeparator()

        params.addInput(PARAMS, 'useBloom')

        params.addInput(PARAMS.bloom, 'radius', {
            label: 'Radius',
            min: 0,
            max: 1,
        }).on('change', () => {
            ev('postUpdate')
        })

        params.addInput(PARAMS.bloom, 'strength', {
            label: 'Strength',
            min: 0,
            max: 3,
        }).on('change', () => {
            ev('postUpdate')
        })

        params.addInput(PARAMS.bloom, 'threshold', {
            label: 'Threshold',
            min: 0,
            max: 1,
        }).on('change', () => {
            ev('postUpdate')
        })

        params.addSeparator()
        params.addInput(PARAMS.particleDiffusion, 'value', {
            label: 'Particule Diffusion',
            min: 0,
            max: 0.3,
        })

        this.controller.gui.addButton({
            title: 'Vanish',
        }).on('click', () => {
            gsap.fromTo(PARAMS.progress, {
                value: 0,
            }, {
                value: 1,
                duration: 5,
                ease: 'slow(.4, .8, false)',
                onStart: () => this.forceRefreshDebugUI(),
                onUpdate: () => this.forceRefreshDebugUI(),
            })
        })

        this.controller.gui.addButton({
            title: 'Materialize',
        }).on('click', () => {
            gsap.to(PARAMS.progress, {
                value: 0,
                duration: 2.4,
                overwrite: true,
                ease: 'power3.inOut',
                onStart: () => this.forceRefreshDebugUI(),
                onUpdate: () => this.forceRefreshDebugUI(),
            })
        })
    }


    /* Handlers
    --------------------------------------------------------- */



    /* Actions
    --------------------------------------------------------- */

    forceRefreshDebugUI() {
        this.controller.gui.refresh()
    }

    /* Values
    --------------------------------------------------------- */

    beginStats() {
        this.controller.beginStats()
    }


    endStats() {
        this.controller.endStats()
    }


    update() {
        this.controller.update()
    }



}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */
