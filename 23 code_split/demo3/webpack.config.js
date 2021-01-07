const HtmlWebpackPlugin = require("html-webpack-plugin");
// 定义nodejs环境变量，决定使用browerslit的哪个环境
/**
 * code split：将打包的一个chunk文件拆分成多个文件，从而实现文件并行加载，而加快响应速度
 * 
 */
process.env.MODE_ENV = 'production'

module.exports = {
    //单入口
    entry:'./src/js/index.js',
    // entry:{
    //     main:'./src/js/index.js',
    //     test:'./src/js/test.js'
    // },
    output: {
        //取文件名
        filename: 'js/[name].[contenthash:10].js',
        //不知为什么，使用resolve的时候，无法创建build目录。
        path: __dirname + '/build'
    },
    plugins: [
        //直接通过该插件来压缩html代码·
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                //移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true,
            }
        }),
    ],
    /**
     *   1.可以将node_modules中代码单独打包成一个chunk最终输出
     *   2.自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
     * 
     */
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    },
    mode: 'production',
}