/**
 * Created by luwenwei on 17/9/14.
 */
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let copyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');
let argv = process.argv;
let port = argv[argv.length - 1] || 3000;/*npm start -- --port 3000*/

let config = {
    output:{
        path: path.resolve(__dirname, '../server/'),
        publicPath: 'http://localhost:'+port+'/server/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },

    devServer:{
        contentBase: path.join(__dirname, "../server"),
        compress: true,
        port: port,
        historyApiFallback:true,
        hot:true,
        inline:true,
        progress:true,
        headers: {
            'Access-Control-Allow-Origin': '*', // 5
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

    plugins:[
        new copyWebpackPlugin([/*把以下的东东copy到自己定义的文件夹里*/
            { from: './data.json', to: path.resolve(__dirname, '../server/') },
            ]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
    ]
};

module.exports = config;