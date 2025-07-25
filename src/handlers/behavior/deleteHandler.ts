import trigger from "../../effect/trigger";
import { TriggerOpTypes } from "../../types/triggerOpTypes.bean";

function deleteProperty<T extends Record<string | symbol, any>>(
  target: T,
  key: string | symbol
) {
  // 判断目标对象是否有要删除的属性
  const hadKey = Object.hasOwn(target, key);

  // 进行删除行为
  const result = Reflect.deleteProperty(target, key);

  // 派发更新前，判断是否有对应删除属性
  if (hadKey && result) {
    trigger(target, TriggerOpTypes.DELETE, key);
  }

  return result;
}

export default deleteProperty;
