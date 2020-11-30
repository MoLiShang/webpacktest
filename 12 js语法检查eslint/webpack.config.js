const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports={
    entry:'./src/js/index.js',
    output:{
        filename:'js/built.js',
        path:__dirname+'/build'
    },
    module:{
        rules:[
            /**
             * 语法检查：eslint-loader依赖于eslint库，因此还需要下载eslint
             * 注意：只检查自己写的源代码，第三方库是不用检查的
             * 设置检查规则：
             *      package.json中eslintConfig中设置
             *  "eslintConfig": {
             *                       "extends": "airbnb-base"
                                }
             *      airbnb -->eslint-config-airbnb-base eslint eslint-plugin-import eslint
             */
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'eslint-loader',
                options:{
                    //自动eslint修复
                    fix:true
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