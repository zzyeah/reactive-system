// 入口文件
// 提供 reactive API
// 该方法接受一个对象

import handlers from "./handlers";
import { isObject } from "./utils/util";

export function reactive<T extends Record<string | symbol, any>>(
  target: T
): Partial<T> & Record<string | symbol, any> {
  if (!isObject(target)) throw new TypeError("target must be an object");
  const proxy = new Proxy(target, {
    get: handlers.get,
    set: handlers.set,
    deleteProperty: handlers.delete,
    has: handlers.has,
    ownKeys: handlers.ownKeys,
  });
  return proxy;
}
