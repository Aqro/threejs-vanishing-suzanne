import loadFont from 'load-bmfont'

export default function bmfontLoader(url) {
    return new Promise((resolve, reject) => {
        loadFont(url, (err, font) => {
            resolve(font)
            reject(err)
        })

    })
}

