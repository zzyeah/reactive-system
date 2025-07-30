import { effect } from "./effect/effect";
import { reactive } from "./reactive";
// const obj = {
//   a: 1,
//   b: 2,
//   c: {
//     name: "zhangsan",
//     age: 18,
//   },
// };
// const state = reactive(obj);

// function fn() {
//   console.log(`fn`);
//   state.a = state.a + 1;
// }

// effect(fn);
// state.a = 40;

// const obj = {
//   a: 1,
//   b: 2,
// };
// const state = reactive(obj);
// effect(() => {
//   if (state.a === 1) {
//     state.b;
//   } else {
//     state.c;
//   }
//   console.log("执行了函数1");
// });
// const effectFn = effect(
//   () => {
//     console.log(state.c);
//     console.log("执行了函数2");
//   },
//   { lazy: true }
// );
// state.a = 2;
// state.c = 3;
// state.b = 3;
// effectFn();

const obj = {
  a: 1,
  b: 2,
};
const state = reactive(obj);
function fn() {
  console.log("fn");
  state.a = state.a + 1;
}
const effectFn = effect(fn, {
  lazy: true,
  scheduler(fn) {
    Promise.resolve().then(() => {
      if (!isRun) {
        isRun = true;
        fn();
      }
    });
  },
});
let isRun = false;

effectFn();
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
