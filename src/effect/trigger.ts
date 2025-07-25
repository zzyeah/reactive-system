import { TriggerOpTypes } from "../types/triggerOpTypes.bean";

function trigger<T extends Record<string | symbol, any>>(
  target: T,
  type: TriggerOpTypes,
  key: string | symbol
) {
  console.log("------------------");
  console.log("触发器被调用了");
  console.log(`拦截到了${type}行为，属性为${String(key)}`);
}
export default trigger;
