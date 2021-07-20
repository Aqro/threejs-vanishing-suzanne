import '../sass/styles.scss'
import gsap from 'gsap'

import { SlowMo } from 'gsap/EasePack'

import Stage from './_Stage'
import Layout from './Layout'
import Browser from './Browser'

gsap.registerPlugin(SlowMo)

/*-----------------------------------------------------------------------------------*/
/*  01. INIT
/*-----------------------------------------------------------------------------------*/

const initApp = () => {
    window.Browser = new Browser()
    window.Layout  = new Layout()
    window.Stage   = new Stage()
}

if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
    initApp()
} else {
    document.addEventListener('DOMContentLoaded', initApp)
}
