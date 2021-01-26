const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/js/index.js',
    output: {
        //文件名称（指定名称+目录）
        filename: 'js/[name].js',
        //输出文件目录（将来所有资源输出的公共目录）
        path: __dirname + '/build',
        //所有输出资源的公共路径前缀-->路径的前面 'imgs/a.jpg' --> '/imgs/a.jpg' 前面是当前目录下，后面是根目录
        publicPath: '/',
        chunkFilename: 'js/[name]_chunk.js',//非入口chunk的名称 1、通过import引入的 2、node_modules的
        library: '[name]',//整个库向外暴露的变量名
        // libraryTarget:'window'//变量名添加到哪个上 browser
        // libraryTarget:'global' //变量名添加到哪个上 node
        libraryTarget: 'commonjs' //变量名添加到哪个上 commonjs
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}