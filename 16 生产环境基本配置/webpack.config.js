const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin=require('optimize-css-assets-webpack-plugin')
// 定义nodejs环境变量，决定使用browerslit的哪个环境
process.env.MODE_ENV='production'
//复用loader
const commonCssLoader=[
     //style-loader创建style标签，并将其放入
                    // 'style-loader',
                    //这个loader取代style-loader，作用：提取js中的css成单独文件
    MiniCssExtractPlugin.loader,
    'css-loader',
    // 兼容性处理,还需要在package.json中定义browerslist
    {
        loader:'postcss-loader',
        options:{
            ident:'postcss',
            plugins:()=>{
                require('postcss-preset-env')()
            }
        }
    }
]
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        //不知为什么，使用resolve的时候，无法创建build目录。
        path:__dirname+'/build'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                  ...commonCssLoader
                ]
            },
            {
                test:/\.less$/,
                use:[
                 ...commonCssLoader,
                    'less-loader',
                ]
            },
            {
                //在package.json中eslintConfig -->airbnb
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'eslint-loader',
                options:{
                    fix:true
                }
            },
            /**
             * 正常来讲，一个文件只能被一个loader处理，当一个文件要被多个loader处理，那么一定要指定loader执行的顺序
             * 先执行eslit再执行babel
             */
            {
                //在package.json中eslintConfig -->airbnb
                test:/\.js$/,
                exclude:/node_modules/,
                enforce:'pres',
                loader:'babel-loader',
                optios:{
                    presets:[
                        '@babel/preset-env',
                        {
                            useBuiltIns:'usage',
                            corejs:{version:3},
                            targets:{
                                chrome:'60',
                                firefox:'50'
                            }
                        }
                    ]
                }
            },
            {
                test:/\.(jpg|png|gif)/,
                loader:'url-loader',
                options:{
                    limit:8*1024,
                    name:'[hash:10].[ext]',
                    outputPath:'imgs',
                    // esModule:false//新版的没有该问题
                }
            },
            //解决html中图片无法解析的问题
            {
                test:/\.html$/,
                loader:'html-loader',
            },
            //处理其他文件
            {
                exclude:/\.(js|css|less|html|jpg|png|gif)/,
                loader:'file-loader',
                options:{
                    outputPath:'media'
                }
            }
        ]
    },
    plugins:[
        //直接通过该插件来压缩html代码·
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            //移除空格
            collapseWhitespace:true,
            // 移除注释
            removeComments:true,
        }),
        new MiniCssExtractPlugin({
            filename:'css/built.css'
        }),
          //压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode:'production'
}