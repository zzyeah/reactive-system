import { TrackOpTypes } from "../types/trackOpTypes.bean";

let shouldTrack = true; // 控制是否需要进行依赖收集

// 暂停依赖收集
export function pauseTracking() {
  shouldTrack = false;
}

// 恢复依赖收集
export function resumeTracking() {
  shouldTrack = true;
}

function track<T extends Record<string | symbol, any>>(
  target: T,
  type: TrackOpTypes,
  key?: string | symbol
) {
  // 先进行开关状态的判断
  if (!shouldTrack) return;
  console.log("------------------");

  if (type === TrackOpTypes.ITERATE) {
    // 说明是遍历操作
    // console.log(`收集器：原始对象` + target);
    console.log(`收集器：行为类型` + type);
  } else {
    // console.log(`收集器：原始对象` + target);
    console.log(`收集器：行为类型` + type);
    console.log(`收集器：属性名` + String(key));
  }
}
export default track;
