const HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'built.js',
        path:__dirname+'/build'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                //问题：默认处理不了html中img图片
                test:/\.(jpg|jpeg|png|gif)$/,
                //需要下载url-loader和file-loader
                loader:'url-loader',
                options:{
                    //图片大小小于8kb，就会被base64处理
                    //优点：减少请求数量（减轻服务器压力）
                    //缺点：图片体积会更大（文件请求速度变慢）
                    limit:8 * 1024,
                    //问题：因为url-loader默认使用es6模块化加息，而html-loader引入图片是commonjs，解析是会出问题
                    //解决：关闭url-loder的es6模块化，使用commonsjs解析
                    // esModule:false //新版的没有该问题
                    //[hash:10]取图片的hash的前10位
                    //[ext]取文件原来扩展名
                    name:'[hash:10].[ext]'
                }
            },
            {

                test:/\.html$/,
                //处理html文件img图片（负责引入img，从而能被url-loader进行处理
                loader:'html-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    // mode:'production',
}