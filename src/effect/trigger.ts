import { ReactiveTarget } from "../types/reactive/reactiveTarget.bean";
import { TriggerOpTypes } from "../types/triggerOpTypes.bean";
import { getEffectFns, triggerTypeTransfer } from "../utils/trigger.util";
import { activeEffect } from "./effect";

function trigger<T extends ReactiveTarget>(
  target: T,
  type: TriggerOpTypes,
  key: string | symbol
) {
  // 找到依赖，执行依赖
  const effectFns = getEffectFns(target, type, key);
  if (!effectFns) return;
  for (const effectFn of effectFns) {
    if (effectFn === activeEffect) continue;
    if (effectFn.options.scheduler) {
      // 用户传递了回调函数，用户期望自己处理依赖函数
      effectFn.options.scheduler(effectFn);
    } else {
      // 执行依赖函数
      effectFn();
    }
  }
}
export default trigger;
