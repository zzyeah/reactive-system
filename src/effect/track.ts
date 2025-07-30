import { ITERATE_KEY, TrackOpTypes } from "../types/trackOpTypes.bean";
import { activeEffect, targetMap } from "./effect";

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
  if (!shouldTrack || !activeEffect) return;

  // 一层一层的找，找到就存储
  let propMap = targetMap.get(target);
  if (!propMap) {
    propMap = new Map();
    targetMap.set(target, propMap);
  }

  /**
   * 对key进行参数规划
   * 因为遍历所有属性的时候，key为undefined
   *  */
  if (type === TrackOpTypes.ITERATE) {
    key = ITERATE_KEY;
  }

  let typeMap = propMap.get(key);
  if (!typeMap) {
    typeMap = new Map();
    propMap.set(key, typeMap);
  }

  // 最后一步，根据 type 值找对应的 Set
  let depSet = typeMap.get(type);
  if (!depSet) {
    depSet = new Set();
    typeMap.set(type, depSet);
  }

  // 找到 set 集合
  // 存储依赖
  if (!depSet.has(activeEffect)) {
    depSet.add(activeEffect);
    activeEffect.deps.push(depSet); // 将集合存储到 deps 中
  }
}
export default track;
