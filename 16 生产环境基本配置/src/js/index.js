// import polyfill from '@babel/polyfill'
const add = (x, y) => x + y;
// 下一行eslint所有规则都失效（下一行不进行eslint检查

// eslint-disable-next-line
console.log(add(2, 5));


const promise=new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('定时器可以执行了')
        resolve();
    },1000);
})

console.log(promise)

console.log(add(2,5))