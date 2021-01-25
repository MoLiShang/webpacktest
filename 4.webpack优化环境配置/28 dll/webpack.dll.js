/**
 * 使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
 * 当你运行webpack时，默认查找webpack.config.js配置文件
 * 需求：需要运行webpack.dll.js
 * --> webpack --config webpack.dll.js
 */
const webpack=require('webpack')
module.exports={
    //最终打包生成的[name] -->jquery
    entry:{
        jquery:['jquery']
    },
    output:{
        filename:'[name].js',
        path:__dirname+'/dll',
        library:'[name]',//打包的库向外暴露的内容叫什么名字
    },
    plugins:[
        //打包生成一个manifest.json --> 提供jquery映射
        new webpack.DllPlugin({
            name:'[name]_[hash]',//映射库的暴露的内容
            path:__dirname+'/dll/manifest.json'//输出文件路径
        })
    ],
    mode:'production'
}