import { ComputedParams } from "../types/computed/computedParams.bean";

// 参数归一化
export function normalizeParam<T>(getterOrOptions: ComputedParams<T>) {
  let getter, setter;
  if (typeof getterOrOptions === "function") {
    // 说明传递的是一个 getter 函数
    getter = getterOrOptions;
    setter = () => {
      console.warn("没有设置 setter 函数");
    };
  } else {
    // 说明传递的是一个对象
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return {
    getter,
    setter,
  };
}
