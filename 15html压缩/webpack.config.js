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
        //直接通过该插件来压缩html代码·
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            //移除空格
            collapseWhitespace:true,
            // 移除注释
            removeComments:true,
        })
    ],
    mode:'production'
}