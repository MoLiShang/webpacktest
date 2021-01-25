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
    },
    //source-map
    devtool:'eval-source-map'
    /**
     * source-map:一种 提供源代码到构建后代码映射 技术（如果构建后代码出错了，通过映射可以追踪源代码错误）,只需要添加一行devtool:'source-map
     * 
     * 自定义配置
     * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
     * source-map 只需要
     * inline-source-map //内联source-map文件，不产生.map文件，只会在output.js文件中添加
     *  只生成了一个source-map
     * hidden-source-map 外部 错误代码错误原因，但是没有错误位置，不能追踪到源代码的错误，只能提示到构建后代码的错误（为了隐藏源代码）
     * 
     * eval-source-map
     * 每一个文件都生成对应的source-map，都在eval
     * 内联 和 外部的区别：1、外部生成了文件 2、外部生成了文件
     * nosource-map 外部 错误代码准确信息，但是没有任何源代码信息
     * cheap-source-map 外部 错误代码准确信息和源代码错误位置 只能精确到行
     * cheap-module-source-map 外部 错误代码准确信息和 源代码的错误位置
     * module会将loader的source-map加入进来
     * 
     * 
     * 
     * 生产环境：速度快，调试更友好
     * 速度快（eval>inline>cheap>...)
     * eval-cheap-source-map
     * eval-source-map
     * 调试更友好
     * source-map
     * cheap-module-source-map
     * cheap-source-map
     * -->   eval-source-map /eval-cheap-module-source-map
     * 开发环境：源代码要不要隐藏？调试要不要更友好
     * 内联会让代码体积变大，所以在生产环境不用内联
     * nosources-source-map
     * hidden-source-map
     * 
     * source-map
     */
}