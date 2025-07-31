import { targetMap } from "../effect/effect";
import { Environment } from "../types/effect/environment.bean";
import { ReactiveTarget } from "../types/reactive/reactiveData.bean";
import { ITERATE_KEY, TrackOpTypes } from "../types/trackOpTypes.bean";
import { TriggerOpTypes } from "../types/triggerOpTypes.bean";

export function triggerTypeTransfer(
  triggerOpTypes: TriggerOpTypes
): TrackOpTypes[] {
  switch (triggerOpTypes) {
    case TriggerOpTypes.ADD:
      return [TrackOpTypes.GET, TrackOpTypes.HAS, TrackOpTypes.ITERATE];
    case TriggerOpTypes.DELETE:
      return [TrackOpTypes.GET, TrackOpTypes.HAS, TrackOpTypes.ITERATE];
    case TriggerOpTypes.SET:
      return [TrackOpTypes.GET];
  }
}

/**
 * 根据传入属性找到对应的依赖函数集合
 * @param target
 * @param type
 * @param key
 * @returns
 */
export function getEffectFns<T extends ReactiveTarget>(
  target: T,
  type: TriggerOpTypes,
  key: string | symbol
) {
  const propMap = targetMap.get(target);
  if (!propMap) return;

  // 如果是新增或者删除操作，会额外触发迭代
  const keys = [key];
  if (type === TriggerOpTypes.ADD || type === TriggerOpTypes.DELETE) {
    keys.push(ITERATE_KEY);
  }

  const effectFns = new Set<Environment>();

  for (const key of keys) {
    const typeMap = propMap.get(key);
    if (!typeMap) continue;
    const trackTypes = triggerTypeTransfer(type);
    for (const trackType of trackTypes) {
      const deps = typeMap.get(trackType);
      if (!deps) continue;

      for (const effectFn of deps) {
        effectFns.add(effectFn);
      }
    }
  }
  return effectFns;
}
