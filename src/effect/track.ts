import { TrackOpTypes } from "../types/trackOpTypes.bean";

function track<T extends Record<string | symbol, any>>(
  target: T,
  type: TrackOpTypes,
  key?: string | symbol
) {
  console.log("------------------");

  if (type === TrackOpTypes.ITERATE) {
    // 说明是遍历操作
    console.log(`收集器：原始对象` + target);
    console.log(`收集器：行为类型` + type);
  } else {
    console.log(`收集器：原始对象` + target);
    console.log(`收集器：行为类型` + type);
    console.log(`收集器：属性名` + String(key));
  }
}
export default track;
