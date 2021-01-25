/**
 * plugins:1、下载 2、引入 3、使用
 */
const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:'./src/js/index.js',
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
        })
    ],
    mode:'development',
    // mode:production
    externals:{
        //拒绝jQuery被打包进来
        //忽略库名 -- npm包名
        jquery:'jQuery'
    }
}