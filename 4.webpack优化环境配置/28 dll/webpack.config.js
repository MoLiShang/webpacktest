/**
 * plugins:1、下载 2、引入 3、使用
 * add-asset-html-webpack-plugin 
 */
const HtmlWebpackPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const path = require('path')
const addAssetHtmlWebpackPlugin=require('add-asset-html-webpack-plugin')
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:__dirname+'/build'
    },
    module:{
        rules:[
            {

            }
        ]
    },
    plugins:[
        //功能，默认创建一个空HTML，自动引入打包输出的所有资源（JS/CSS）
        //需求：需要有结构的HTML文件
        new HtmlWebpackPlugin({
            //复制'./src/index.html'文件，并自动引入打包输出的所有资源
            template:'./src/index.html'
        }),
        //告诉webpack哪些库不参与打包，同时使用时的名称也得改
        new webpack.DllReferencePlugin({
            manifest:__dirname+'/dll/manifest.json'//
        }),
        //将某个文件打包出去，并在html中自动引入该资源
        new addAssetHtmlWebpackPlugin({
            filepath:path.resolve(__dirname,'dll/*.js')
        })
    ],
    // mode:'development',
    mode:'production'
}