// const depsMap = new Map<any, any>();
// let activeEffect: any = null;
// const effectStack: any[] = [];

// const data = {
//   a: 1,
//   b: 2,
//   c: 3,
// };

// const state = new Proxy(data, {
//   get: function (target, key) {
//     track(target, key);
//     return Reflect.get(target, key);
//   },
//   set: function (target, key, value) {
//     const result = Reflect.set(target, key, value);
//     trigger(target, key);
//     return result;
//   },
// });

// function track(
//   target: { a: number; b: number; c: number },
//   key: string | symbol
// ) {
//   if (activeEffect) {
//     let deps = depsMap.get(key);
//     if (!deps) {
//       deps = new Set();
//       depsMap.set(key, deps);
//     }
//     deps.add(activeEffect);
//     activeEffect.deps.push(deps);
//   }
//   console.log(depsMap);
// }

// function trigger(
//   target: { a: number; b: number; c: number },
//   key: string | symbol
// ) {
//   const deps = depsMap.get(key);
//   if (deps) {
//     const effectsToRun = new Set(deps);
//     effectsToRun.forEach((effect: any) => {
//       effect();
//     });
//   }
// }

// function cleanup(environment: any) {
//   const deps = environment.deps;
//   if (Array.isArray(deps) && deps.length) {
//     deps.forEach((dep: Set<any>) => {
//       dep.delete(environment);
//       if (dep.size === 0) {
//         for (const [key, value] of depsMap) {
//           if (value === dep) {
//             depsMap.delete(key);
//           }
//         }
//       }
//     });
//     deps.length = 0;
//   }
// }

// function effect(fn: { (): void; (): void }) {
//   const environment = () => {
//     activeEffect = environment;
//     effectStack.push(environment);
//     cleanup(environment);
//     fn();
//     effectStack.pop();
//     activeEffect = effectStack[effectStack.length - 1];
//   };
//   environment.deps = <any[]>[];
//   environment();
// }

// effect(() => {
//   if (state.a === 1) {
//     state.b;
//   } else {
//     state.c;
//   }
//   console.log("执行了函数1");
// });
// effect(() => {
//   console.log(state.c);
//   console.log("执行了函数2");
// });
// state.a = 2;
