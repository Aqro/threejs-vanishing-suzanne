import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const loader = new GLTFLoader()

// Optional
// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('./node_modules/three/examples/js/libs/draco/')
// dracoLoader.preload()
// loader.setDRACOLoader(dracoLoader)

export default (url, id) => new Promise((resolve, reject) => {
    loader.load(url, (gltf) => {
        const result = gltf.scene
        resolve(result)
    })
})
