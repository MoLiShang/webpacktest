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
    //生产环境下自动压缩js，因此不需要担心
    mode:'production'
}