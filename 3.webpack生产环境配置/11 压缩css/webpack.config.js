const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
//设置nodejs环境变量
//optimize-css-assets-webpack-plugin
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:__dirname+'/build'
    },
    module:{
        rules:[
            {
                //css
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            ident:'postcss',
                            plugins:[
                                require('postcss-preset-env')
                            ]
                        }
                    }
                ]
            },
            
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'/css/built.css'
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode:'development'
}