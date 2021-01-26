const resolve = require('path').resolve
// console.log(resolve(__dirname,''))
const HtmlWebpackPlugin = require("html-webpack-plugin");
const terserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
    entry: './src/js/index.js',
    output: {
        //文件名称（指定名称+目录）
        filename: 'js/[name].[contenthash:10].js',
        //输出文件目录（将来所有资源输出的公共目录）
        path: __dirname + '/build',
        //所有输出资源的公共路径前缀-->路径的前面 'imgs/a.jpg' --> '/imgs/a.jpg' 前面是当前目录下，后面是根目录
        publicPath: '/',
        chunkFilename: 'js/[name].[contenthash:10]_chunk.js',//非入口chunk的名称 1、通过import引入的 2、node_modules的
        library: '[name]',//整个库向外暴露的变量名
        // libraryTarget:'window'//变量名添加到哪个上 browser
        // libraryTarget:'global' //变量名添加到哪个上 node
        libraryTarget: 'commonjs' //变量名添加到哪个上 commonjs
    },
    module: {
        rules: [
            //loader的配置
            {
                test: /\.css$/,
                //多个loader用use
                use: ['style-loader', 'css-loader']
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    //解析模块的规则
    resolve: {
        //配置解析模块路径别名:简写路径，缺点：路径没有提示
        alias: {
            $css: resolve(__dirname, '/src/css')
        },
        //配置省略文件路径的后缀名:不知为什么，省略的话会报错
        extensions: ['js', 'json', 'jsx', 'css'],
        //告诉webpack解析模块时候应该去找哪个目录
        modules: [resolve(__dirname, '../../.../node_modules'), 'node_modules']
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            /**下面是默认值，可以不写 */
            // miniSize:30*1024,//分割的chunk最小为30kb
            // maxSize:0,//最大没有限制
            // minChunks:1,//要提取的chunk最少被引用一次
            // maxAsyncRequests:5,//按需加载时并行加载的文件的最大数量为5
            // maxInititalRequests:3,//入口js文件最大并行请求数量
            // automaticNameDelimiter:'~',//名称连接符
            // name:true,//可以使用命名规则
            // cacheGroup:{//分割chunk的组
            //     //node_moudles文件会被打包到vendors组的chunk中。 --> vendors~xxx.js
            //     //满足上面的公共规则,如大小超过30kb，至少被引用1次。
            //     vendors:{
            //         test:/[\\/]node_modules[\\/]/,
            //         //打包优先级
            //         piority:-10
            //     },
            //     default:{
            //         miniChunks:2,//要提取的chunk最少被引用2次
            //         priority:-20,
            //         //如果当前要打包的模块，和之前已经被提取的模块是同一个，就会复用，而不是重新打包模块
            //         reuseExistingChunk:true,
            //     }
            // }
        },
        runtimeChunk: {
            //将当前模块的记录其他模块的hash单独打包为一个文件runtime
            //解决：修改a文件导致b文件的contenthash变化
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimizer: [
            //配置生产环境的压缩方案:js和css
            new terserWebpackPlugin({
                //开启缓存
                cache: true,
                //开启多进程打包
                parallel: true,
                //启动source-map
                // sourceMap:true
            })
        ]
    }
}