// 入口文件
// 提供 reactive API
// 该方法接受一个对象

import handlers from "./handlers";
import { Reactive } from "./types/reactive.bean";
import { ReactiveTarget } from "./types/reactive/reactiveTarget.bean";
import { isObject } from "./utils/util";

// 映射表：存储原始对象和代理对象的映射关系
const proxyMap = new WeakMap();

export function reactive<T extends ReactiveTarget>(target: T): Reactive<T> {
  // 如果传入的 target 不是对象，则直接返回
  if (!isObject(target)) return target;

  // 对象已经代理过，直接返回
  if (proxyMap.has(target)) return proxyMap.get(target);

  const proxy = new Proxy<T>(target, handlers);

  proxyMap.set(target, proxy);

  return proxy as Reactive<T>;
}
