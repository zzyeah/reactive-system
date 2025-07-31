import { EffectOptions } from "../types/effect/effectOptions.bean";
import { Environment } from "../types/effect/environment.bean";
import { TargetMap } from "../types/reactive/reactiveData.bean";

export let activeEffect: Environment;
export const targetMap = <TargetMap>new Map(); // 用于存储对象和其属性的依赖关系
const effectStack: Environment[] = []; // 模拟函数栈

// 全局变量存储待清理的数据
// 1. 延迟清理需要的数据
const pendingCleanup = new Set<any>(); // 存储待清理的依赖集合
let cleanupScheduled = false;

// 全局变量用于跟踪清理进度
// 2. 增量清理需要的数据
let cleanupIterator: Iterator<[any, any]> | null = null;
let currentPropMapIterator: Iterator<[any, any]> | null = null;
let currentTypeMapIterator: Iterator<[any, any]> | null = null;

export function effect(fn: Function, opts: EffectOptions = {}) {
  const { lazy = false } = opts;
  const environment: Environment = () => {
    try {
      activeEffect = environment;
      effectStack.push(environment);
      cleanup(environment);
      return fn();
    } catch (error) {
      console.warn(`effect error:`);
      console.warn(error);
      console.warn(`--------------`);
    } finally {
      effectStack.pop();
      activeEffect = effectStack[environment.length - 1];
    }
  };
  environment.deps = [];
  environment.options = opts;
  if (!lazy) {
    environment();
  }
  return environment;
}

export function cleanup(environment: Environment) {
  const deps = environment.deps;
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment);
      // // 如果集合为空，标记为待清理
      // // 延迟清理
      // if (dep.size === 0) {
      //   pendingCleanup.add({ targetMap, dep }); // 标记需要清理的数据
      // }
    });
    deps.length = 0;
    // // 启动增量清理过程
    // scheduleIncrementalCleanup();
  }
}

// 批量清理函数
// 1. 延迟清理
// 需要手动在合适的情况调用该函数
export function performPendingCleanup() {
  if (cleanupScheduled) return;

  cleanupScheduled = true;

  // 在下一个事件循环中执行清理
  Promise.resolve().then(() => {
    pendingCleanup.forEach(({ dep }) => {
      // 执行实际的清理操作
      for (const [reactiveTarget, propMap] of targetMap) {
        for (const [reactiveKey, typeMap] of propMap) {
          for (const [trackOpTypes, effectSet] of typeMap) {
            if (effectSet.size === 0) {
              typeMap.delete(trackOpTypes);
            }
          }
          if (typeMap.size === 0) {
            propMap.delete(reactiveKey);
          }
        }
        if (propMap.size === 0) {
          targetMap.delete(reactiveTarget);
        }
      }
    });

    pendingCleanup.clear();
    cleanupScheduled = false;
  });
}

// 2. 增量清理
// 仅在浏览器环境可执行
// function scheduleIncrementalCleanup() {
//   // 使用 requestIdleCallback 或 setTimeout 来分批处理
//   if ('requestIdleCallback' in window) {
//     (window as any).requestIdleCallback(performIncrementalCleanup, { timeout: 1 });
//   } else {
//     setTimeout(performIncrementalCleanup, 0);
//   }
// }

// function performIncrementalCleanup(deadline?: { timeRemaining(): number }) {
//   const startTime = Date.now();
//   const timeLimit = deadline ? () => deadline.timeRemaining() > 1 : () => Date.now() - startTime < 5;

//   try {
//     // 初始化迭代器
//     if (!cleanupIterator) {
//       cleanupIterator = targetMap.entries();
//     }

//     // 增量处理
//     while (timeLimit()) {
//       if (currentTypeMapIterator) {
//         // 处理 typeMap 层
//         const typeMapResult = currentTypeMapIterator.next();
//         if (!typeMapResult.done) {
//           const [trackOpTypes, effectSet] = typeMapResult.value;
//           if (effectSet.size === 0) {
//             // 获取当前 typeMap 的引用进行删除操作
//             // 这里需要额外的逻辑来获取正确的引用
//           }
//           continue;
//         } else {
//           currentTypeMapIterator = null;
//         }
//       }

//       if (currentPropMapIterator) {
//         // 处理 propMap 层
//         const propMapResult = currentPropMapIterator.next();
//         if (!propMapResult.done) {
//           const [reactiveKey, typeMap] = propMapResult.value;
//           currentTypeMapIterator = typeMap.entries();
//           continue;
//         } else {
//           currentPropMapIterator = null;
//         }
//       }

//       // 处理 targetMap 层
//       const result = cleanupIterator.next();
//       if (!result.done) {
//         const [reactiveTarget, propMap] = result.value;
//         currentPropMapIterator = propMap.entries();
//         continue;
//       } else {
//         // 清理完成
//         cleanupIterator = null;
//         break;
//       }
//     }

//     // 如果还有未完成的工作，安排下一批处理
//     if (cleanupIterator) {
//       scheduleIncrementalCleanup();
//     }
//   } catch (error) {
//     console.error('Incremental cleanup error:', error);
//     cleanupIterator = null;
//   }
// }
