/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const glob = require('glob')

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
// const webpack = require('webpack')
const sass = require('sass')

const finalPath = path.resolve(__dirname, 'dist')

module.exports = {
    entry: ['./src/js/index.js'],
    output: {
        path: finalPath,
        filename: 'app.js',
    },
    resolve: {
        alias: {
            '@comps': path.resolve(__dirname, 'src/js/components'),
            '@scene': path.resolve(__dirname, 'src/js/scene/'),
            '@ctrl': path.resolve(__dirname, 'src/js/controllers/'),
            '@mat': path.resolve(__dirname, 'src/js/materials/'),
            '@gpu': path.resolve(__dirname, 'src/js/gpu-shaders/'),
            '@params': path.resolve(__dirname, 'src/js/params/'),
            '@passes': path.resolve(__dirname, 'src/js/passes/'),
            '@utils': path.resolve(__dirname, 'src/js/utils/'),
        },
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: sass,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|ttf|otf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
            {
                test: /\.(obj|glb)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'models',
                        },
                    },
                ],
            },
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                use: [
                    'glsl-shader-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'app.css',
        }),
        new CopyPlugin({
            patterns: [
                { from: './src/models', to: path.join(finalPath, '/models'), force: true },
                { from: './src/fonts', to: path.join(finalPath, '/fonts'), force: true },
                { from: './src/img', to: path.join(finalPath, '/img'), force: true },
            ],
        }),
        new PurgecssPlugin({
            paths: glob.sync(`${finalPath}/**/*`, { nodir: true }),
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: '.' },
            browser: 'google chrome',
        }),
    ],
}
