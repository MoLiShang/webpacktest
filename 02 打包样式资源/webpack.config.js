/**
 * webpack.config.js webpack配置文件
 *  作用：指示webpack干哪些活（当运行webpack指令是，会加载里面的配置）
 * 
 * 所有构建工具都是nodejs平台运行的~模块化默认采用commonjs
 * 
 * src是写项目的模块，用的是ES6模块，而webpack.config.js是写配置的，使用的是commosjs模块
 */
//resolve用来凭借绝对路径的方法
 const path=require('path')
module.exports={
    //webpack配置
    //入口起点
    entry:'./src/index.js',
    //输出
    output:{
        filename:'built.js',
        //__dirname nodejs的变量，代表当前文件的目录绝对路径
        path:path.resolve(__dirname,'build')
    },
    //loader的配置
    module:{
        rules:[
            //详细loader配置
            //不同文件配置不同loader处理
            {
                //匹配哪些文件
                test:/\.css$/,
                //使用哪些loader进行处理
                use:[
                    //use数组中loader执行队列，从右到左，从下到上，依次进行
                    //创建style标签，将js中的样式资源插入进去，添加到head中生效
                    'style-loader',
                    //将css文件编程commonjs模块加载js，里面内容是样式字符串
                    'css-loader' 
                    //先执行的css-loader
                ]
            },
            {
                test:/\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    //将less文件编译成css文件
                    'less-loader'
                ]
            }
        ]
    },
    //plugins的配置
    plugins:[
        //详细plugins配置
    ]
    ,
    //模式 有开发模式和生产模式
    mode:'development',//开发模式
    // mode:'production'//生产模式
}