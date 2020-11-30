const HtmlWebPackPlugin=require('html-webpack-plugin')
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
                    'style-loader','css-loader'
                ]
            },
                //打包其他资源(除了html/css/js资源以外的资源)
            {
                //排除css/js/html资源
                exclude:/\.(css|js|html)$/,
                use:['url-loader'],
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development',
    //开发服务器 devServer:用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    //特点：只会在内存中编译打包，不会有任何输出
    //启动devServer指令为npx webpack-dev-server，不会输出build，以及任何文件，
    //监视代码变化，一旦变化，自动编译
    devServer:{
        //项目构建后路径
        contentBase:__dirname+'build',
        //启动gzip压缩    
        compress:true,
        //端口后
        port:3000,
        //自动打开浏览器
        open:true
    }
}