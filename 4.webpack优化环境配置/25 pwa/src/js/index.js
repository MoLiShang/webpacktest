// import polyfill from '@babel/polyfill'
import '../css/index.css';
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// 下一行eslint所有规则都失效（下一行不进行eslint检查
// eslint-disable-next-line
console.log('sum', sum(1, 2, 3, 4, 5, 6));

console.log('mul', mul(2, 3));
/*
  1、eslint不认识window、navigator全局变量
  解决：需要修改package.json中eslintConfig配置
    "eslintConfig": {
    "extends": "airbnb-base",
    "env": {
      "browser": true
    }
  },
  2、sw代码必须运行在服务器上
  -->nodejs
  -->
     npm i serve -g
     serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
  */
 //激活pwa
// 注册serviceworker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('sw注册成功了~~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}
