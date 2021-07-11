

/* BROWSER SNIFFING
---------------------------------------------------------------------------------------------------- */

export default class Browser {

    constructor() {
        const P  = navigator.platform
        const UA = navigator.userAgent
        // const AV = navigator.appVersion

        this.isMobile = (/iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(UA))

        this.isSafari = UA.indexOf('Safari') > -1
        this.isSafariDesktop = (!this.isMobile && this.isSafari)

        this.isiPad   = (/iPad/i.test(UA)) || (P === 'MacIntel' && navigator.maxTouchPoints > 1)
        this.isiPhone = (/iPhone|iPod/i.test(UA))
        this.isWebApp = navigator.standalone


        this.isDevice = this.isMobile || this.isiOS
    }

}




/* CONSTANTS & HELPERS
---------------------------------------------------------------------------------------------------- */
