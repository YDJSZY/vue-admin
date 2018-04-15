const env = process.env.NODE_ENV;
const webpackMerge = require('webpack-merge');
if(env === "development"){
    module.exports = webpackMerge(require("./webpack.base.conf"),require("./webpackConfig/webpack.dev.conf"));
}else if(env === "production"){
    module.exports = webpackMerge(require("./webpack.base.conf"),require("./webpackConfig/webpack.prod.conf"))
}else if(env === "server"){
    module.exports = webpackMerge(require("./webpack.base.conf"),require("./webpackConfig/webpack.devServer"))
}