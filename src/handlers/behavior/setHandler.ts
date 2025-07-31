import trigger from "../../effect/trigger";
import { ReactiveTarget } from "../../types/reactive/reactiveTarget.bean";
import { TriggerOpTypes } from "../../types/triggerOpTypes.bean";
import { hasChanged } from "../../utils/util";

function setHandler<T extends ReactiveTarget>(
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

  // 缓存旧数组长度
  const oldLength = Array.isArray(target) ? target.length : undefined;

  // 先进行设置操作
  const result = Reflect.set(target, key, value, receiver);

  // 判断是否需要派发更新
  if (hasChanged(oldValue, value)) {
    trigger(target, type, key);

    // 需要判断 length 属性是否发生变化，数组的 length 属性变化需要派发更新
    if (Array.isArray(target) && oldLength && oldLength !== target.length) {
      if (key !== "length") {
        // 说明 length 属性发生了隐式变化
        // 触发数组长度变化的更新
        trigger(target, TriggerOpTypes.SET, "length");
      } else {
        // 说明 length 属性发生了显式变化
        // 处理新的长度小于旧的长度的情况，这里涉及了删除操作
        for (let i = target.length; i < oldLength; i++) {
          trigger(target, TriggerOpTypes.DELETE, i.toString());
        }
      }
    }
  }

  return result;
}

export default setHandler;
