import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const loader = new OBJLoader()

export default (url, id) => new Promise((resolve, reject) => {
    loader.load(url, (model) => {
        console.log(model);

        const result = { model }
        resolve(result)
    })
})
