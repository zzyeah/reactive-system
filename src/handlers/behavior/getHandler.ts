import track, { pauseTracking, resumeTracking } from "../../effect/track";
import { reactive } from "../../reactive";
import {
  arrayCollectInstrumentationsTypes,
  ArrayInstrumentations,
  arrayInstrumentationsTypes,
  arrayPauseInstrumentationsTypes,
} from "../../types/arrayInstrumentations.bean";
import { ReactiveTarget } from "../../types/reactive/reactiveData.bean";
import { RAW } from "../../types/symbol.bean";
import { TrackOpTypes } from "../../types/trackOpTypes.bean";
import { isArrayInstrumentationMethod, isObject } from "../../utils/util";

const arrayInstrumentations = <ArrayInstrumentations>{};
arrayCollectInstrumentationsTypes.forEach((method) => {
  arrayInstrumentations[method] = function (this: any, ...args: any[]) {
    // 1. 首先正常找，此时 this 指向的是代理对象
    const res = (Array.prototype[method] as any).apply(this, args);
    // 2. 找不到
    if (res < 0 || res === false) {
      // 需要拦截器返回原始对象
      // this[RAW] 拿到的就是原始对象
      return (Array.prototype[method] as any).apply(this[RAW], args);
    }
    return res;
  };
});

// 重写 push、pop、shift、unshift
// 在调用这几个方法时，需要暂停依赖收集，调用完毕之后再恢复
arrayPauseInstrumentationsTypes.forEach((method) => {
  arrayInstrumentations[method] = function (this: any[], ...args: any[]) {
    pauseTracking();
    const res = (Array.prototype[method] as any).apply(this, args);
    resumeTracking();
    return res;
  };
});

function getHandler<T extends ReactiveTarget>(
  target: T,
  key: string | symbol,
  receiver: any
) {
  // RAW 是一个特殊的标识，用于获取原始对象
  // 这个标识不能和已有属性重复，所以需要使用 Symbol 类型
  if (key === RAW) {
    return target;
  }

  // 收集依赖
  track(target, TrackOpTypes.GET, key);

  // 判断是否为数组的方法，如果是需要重写数组方法
  if (
    Object.hasOwn(arrayInstrumentations, key) &&
    Array.isArray(target) &&
    isArrayInstrumentationMethod(key)
  ) {
    return arrayInstrumentations[key];
  }
  const result = Reflect.get(target, key, receiver);
  // 获取到的成员可能是对象，需要递归处理，将其转换为响应式
  if (isObject(result)) return reactive(result);
  return result;
}

export default getHandler;
