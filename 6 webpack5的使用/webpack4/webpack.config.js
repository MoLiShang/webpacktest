const { resolve4 } = require('dns')
const resolve=require('path').resolve

module.exports={
    entry:'./src/index.js',
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'build')
    },
    mode:'production',
}