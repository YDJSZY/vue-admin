/**
 * Created by luwenwei on 17/9/16.
 */
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let path = require("path");
let env = process.env.NODE_ENV;
let webpackConfig = {
    entry: {
        app:path.resolve(__dirname, './src/index.js'),
        //fontAwesome:path.resolve(__dirname, './node_modules/font-awesome/css/font-awesome.min.css'),
    },
  
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                    // other vue-loader options go here
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015','stage-0'],
                },
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')], // 指定检查的目录
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,  // replace ExtractTextPlugin.extract({..})
                    "css-loader"
                ]
            },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=50000&name=font/[name].[ext]'}
        ],
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'vue-admin',
            filename: 'admin.html',
            template:'./src/admin.html',
            inject: true, // 自动注入
            minify: {
                removeComments: true,        //去注释
                collapseWhitespace: true,    //压缩空格
                removeAttributeQuotes: true  //去除属性引用
            },
            //必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
            chunksSortMode: 'dependency'
        })
    ]
};

if(env !== "server"){
    webpackConfig.plugins.push(new CleanWebpackPlugin(['dist']))//传入数组,指定要删除的目录
}

module.exports = webpackConfig;