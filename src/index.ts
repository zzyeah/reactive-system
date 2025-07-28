import { reactive } from "./reactive";
const obj = {
  a: 1,
  b: 2,
  c: {
    name: "zhangsan",
    age: 18,
  },
};

const arr = [1, obj, 3]
const proxyArr = reactive(arr);

// 测试读取行为
// proxyArr[0]
// proxyArr.length
// for (const key in proxyArr) {
//   proxyArr[key]
// }
// for (let i = 0; i < proxyArr.length; i++) {
//   const element = proxyArr[i];

// }

// proxyArr.includes(1);
// proxyArr.indexOf(1);

// const result = proxyArr.includes(obj);
// console.log(result); // true


// 测试写入行为
// proxyArr[0] = 100;  

// proxyArr[6] = 100; // 涉及隐式长度操作

// proxyArr.length = 1; // 涉及显式长度操作

proxyArr.push(100);
