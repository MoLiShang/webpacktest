const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:__dirname+'/build'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    //style-loader创建style标签，并将其放入
                    // 'style-loader',
                    //这个loader取代style-loader，作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    //将css文件整合到js中
                    'css-loader',
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        })
    ],
    mode:'development'
}