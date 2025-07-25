import trigger from "../../effect/trigger";
import { TriggerOpTypes } from "../../types/triggerOpTypes.bean";
import { hasChanged } from "../../utils/util";

function setHandler<T extends Record<string | symbol, any>>(
  target: T,
  key: string | symbol,
  value: any,
  receiver: any
): boolean {
  // 判断具体操作类型
  // 可能是设置，可能是新增
  const type = Object.hasOwn(target, key)
    ? TriggerOpTypes.SET
    : TriggerOpTypes.ADD;

  // 先缓存旧值
  const oldValue = target[key];

  // 先进行设置操作
  const result = Reflect.set(target, key, value, receiver);

  // 判断是否需要派发更新
  if (hasChanged(oldValue, value)) {
    trigger(target, type, key);
  }

  return result;
}

export default setHandler;
