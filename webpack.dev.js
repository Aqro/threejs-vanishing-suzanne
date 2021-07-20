const { merge } = require('webpack-merge')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const commonConfiguration = require('./webpack.common')


module.exports = merge(
    commonConfiguration,
    {
        mode: 'development',
        devtool: 'inline-source-map',
        plugins: [
            new BrowserSyncPlugin({
                host: 'localhost',
                port: 3000,
                server: { baseDir: '.' },
                browser: 'google chrome',
            }),
        ],
    },
)
