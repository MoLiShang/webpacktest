const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:__dirname+'/build'
    },
    module:{

    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    //生产环境下自动压缩js，因此不需要担心，因此只要将mode调整成为‘production’即可以进行js的压缩
    mode:'production'
}