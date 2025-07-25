import track from "../../effect/track";
import { reactive } from "../../reactive";
import { TrackOpTypes } from "../../types/trackOpTypes.bean";
import { isObject } from "../../utils/util";

function getHandler<T extends Record<string | symbol, any>>(
  target: T,
  key: string | symbol,
  receiver: any
) {
  console.log(`拦截到了读取${String(key)}行为`);
  // 收集依赖
  track(target, TrackOpTypes.GET, key);
  const result = Reflect.get(target, key, receiver);
  // 获取到的成员可能是对象，需要递归处理，将其转换为响应式
  if (isObject(result)) return reactive(result);
  return result;
}

export default getHandler;
