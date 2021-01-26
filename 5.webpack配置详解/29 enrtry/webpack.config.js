const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
    entry:入口七点
    1、string  -->   entry: './src/js/index.js',
    打包形成一个chunk，输出一个bundle文件
    此时chunk的名称默认是main
    2、array   -->   entry:[ './src/js/index.js','./src/js/add.js'],
    多入口
    所有入口文件最终只会形成一个chunk，输出出去只有一个bundle
    --> 只有在HMR功能中让html热更新生效~
    3、object
      多入口
      有几个入口文件就形成几个chunk，输出几个bundle
      此时chunk名称是key
      
      
      --> 特殊用法 
    entry:{
        所有入口文件最终只会形成一个chunk，输出出去只有一个bundle
        index:['./src/js/index.js','./src/js/count.js'],
        形成一个chunk，输出一个bundle
        add:'./src/js/add.js'
    },
*/
module.exports = {
    entry: {
        index: ['./src/js/index.js', './src/js/count.js'],
        add: './src/js/add.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/build'
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}