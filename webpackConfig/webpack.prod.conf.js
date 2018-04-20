/**
 * Created by luwenwei on 17/9/13.
 */
let path = require('path')
let UglifyJsPlugin = require('uglifyjs-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
let config = {
    output: {
        path: path.resolve(__dirname, '../dist/'),
        publicPath: './',
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
    },

    module: {
        rules: [
        ]
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: '[id].css'
        })
    ]
}

module.exports = config
