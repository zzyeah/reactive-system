import { reactive } from "./reactive";
const obj = {
  a: 1,
  b: 2,
  c: {
    name: "zhangsan",
    age: 18,
  },
};
const proxyObj = reactive(obj);
for (const key in proxyObj) {
  // console.log(proxyObj[key]);
}
