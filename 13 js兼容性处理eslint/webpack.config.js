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
            /**
             * js兼容性处理：babel-loader @babel/core @babel-preset-env
             */
            //检测js文件
            test:/\.js$/,
            exclude:/node_modules/,
            loader:'babel-loader',
            options:{
                presets:['@babel/preset-env']
            }
          }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
}