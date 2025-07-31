import { effect } from "../effect/effect";
import track from "../effect/track";
import trigger from "../effect/trigger";
import { ComputedParams } from "../types/computed/computedParams.bean";
import { TrackOpTypes } from "../types/trackOpTypes.bean";
import { TriggerOpTypes } from "../types/triggerOpTypes.bean";
import { normalizeParam } from "../utils/computed.util";

export function computed<T>(getterOrOptions: ComputedParams<T>) {
  // 1. 参数归一化
  const { getter, setter } = normalizeParam<T>(getterOrOptions);

  // 存储计算属性的值
  let value: T;

  // 表示计算属性是否脏，如果为 true，说明需要重新计算
  let dirty = true;

  const effectFn = effect(getter, {
    lazy: true,
    scheduler: () => {
      dirty = true;
      trigger(obj, TriggerOpTypes.SET, "value");
    },
  });

  // 2. 返回一个对象
  const obj = {
    get value() {
      track(obj, TrackOpTypes.GET, "value");
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      return value;
    },
    set value(newValue) {
      setter(newValue);
    },
  };

  return obj;
}
