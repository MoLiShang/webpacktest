/**
 * HMR:hot module replacement 热模块替换/模块热替换
 * 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
 * 极大提升构建速度
 * 样式文件：可以使用HMR功能；因为style-loader内部实现了~
 * js文件：默认不能使用HMR功能 --->需要修改js代码，添加支持HMR功能的代码
 *  注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
 * html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新了~（不用做HMR功能）
 * 解决：修改entry入口，将html文件引入
 * 
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 定义nodejs环境变量，决定使用browerslit的哪个环境
process.env.MODE_ENV = 'production'
module.exports = {
    entry: ['./src/js/index.js','./src/index.html'],
    output: {
        filename: 'js/built.js',
        //不知为什么，使用resolve的时候，无法创建build目录。
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader',]
            },
            {
                test: /\.css$/,
                // 使用style-loader和css-loader时会将css代码整合到js中，这样不好，因此需要使用mini-css-extract-plugin将css单独提取
                use: ['style-loader', 'css-loader',]
            },
            {
                test: /\.(jpg|png|gif)/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'imgs',
                    // esModule:false//新版的没有该问题
                }
            },
            //解决html中图片无法解析的问题
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            //处理其他文件
            {
                exclude: /\.(js|css|less|html|jpg|png|gif)/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        //直接通过该插件来压缩html代码·
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    mode: 'development',
    devServer: {
        //项目构建后路径
        contentBase: __dirname + 'build',
        //启动gzip压缩    
        compress: true,
        //端口后
        port: 3000,
        //自动打开浏览器
        open: true,
        //当修改了webpack配置，需要重启webpack服务才能
        hot:true,//开启HMR功能
    }
}