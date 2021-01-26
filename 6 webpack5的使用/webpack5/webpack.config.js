const { resolve4 } = require('dns')
const resolve=require('path').resolve

module.exports={
    //设置为了mode之后默认为如下
    // entry:'./src/index.js',
    // output:{
    //     filename:'[name].js',
    //     path:resolve(__dirname,'build')
    // },
    mode:'production',
}