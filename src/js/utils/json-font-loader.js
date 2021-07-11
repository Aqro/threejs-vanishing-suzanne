import { FontLoader } from 'three'

const fl = new FontLoader()

export default function (url) {
    return new Promise((resolve, reject) => {
        fl.load(url, (font, err) => {
            resolve(font)

            reject(err)
        })

    })
}

