function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}
// 下一行eslint所有规则都失效（下一行不进行eslint检查
// eslint-disable-next-line
console.log('sum', sum(1, 2, 3, 4, 5, 6));

