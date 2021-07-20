const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const commonConfiguration = require('./webpack.common')


module.exports = merge(
    commonConfiguration,
    {
        mode: 'production',
        optimization: {
            minimize: true,
            minimizer: [
                (compiler) => {
                    new TerserPlugin({
                        terserOptions: {
                            compress: {},
                            format: {
                                comments: false,
                            },
                        },
                        extractComments: false,
                    }).apply(compiler)
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
        ],
    },
)
