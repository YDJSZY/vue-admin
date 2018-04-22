/**
 * Created by luwenwei on 17/9/14.
 */
let webpack = require('webpack')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let CopyWebpackPlugin = require('copy-webpack-plugin')
let path = require('path')
let argv = process.argv
let port = argv[argv.length - 1] || 3000 /*npm start -- --port 3000*/

let config = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: port,
        historyApiFallback: true,
        hot: true,
        host: '0.0.0.0',
        inline: true,
        progress: true,
        headers: {
            'Access-Control-Allow-Origin': '*' // 5
        },
        proxy: {
            /*'/api': {
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                secure: false
            },
            '/accounts/':{
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                secure: false
            },
            '/static/':{
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                secure: false
            },
            '/admin/':{
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                secure: false
            },
            '/backend/':{
                target: 'http://127.0.0.1:8000/',
                changeOrigin: true,
                secure: false
            }*/
        }
    },

    module: {
        rules: [
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(), //调用webpack的热更新插件
        new CopyWebpackPlugin([
            { from: './constants.json', to: path.resolve(__dirname, 'dist') },
            { from: './myinfo.json', to: path.resolve(__dirname, 'dist') },
            { from: './data.json', to: path.resolve(__dirname, 'dist') }
        ]), /*把以下的东东copy到自己定义的文件夹里*/
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
}

module.exports = config
