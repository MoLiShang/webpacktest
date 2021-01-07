
// import {mul} from './test'

/**
 * 通过js代码，让某个文件被单独打包尘一个chunk
 * import动态导入语法“能够将某个文件单独打包
 */

import(/*webpackChunkName:'test' */ './test').then(({mul,count}) => {
  console.log(mul(2,5))
}).catch(() => {
  console.log('文件加载失败')
})
function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// 下一行eslint所有规则都失效（下一行不进行eslint检查
// eslint-disable-next-line
console.log('sum', sum(1, 2, 3, 4, 5, 6));



// console.log('mul', mul)
