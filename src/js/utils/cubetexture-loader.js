import { CubeTextureLoader } from 'three'

const loader = new CubeTextureLoader()

export default (url, name, ext = 'png') => new Promise((resolve, reject) => {
    const urls = [
        `${url}${name}px.${ext}`,
        `${url}${name}nx.${ext}`,
        `${url}${name}py.${ext}`,
        `${url}${name}ny.${ext}`,
        `${url}${name}pz.${ext}`,
        `${url}${name}nz.${ext}`,
    ]
    loader.load(urls, (r) => {
        resolve(r)
    })
})
