export function isObject(target: any): target is object {
  return target !== null && typeof target === "object";
}

export function hasChanged(oldValue: any, newValue: any): boolean {
  // 规避特殊情况
  // 1. NaN === NaN 在JS中返回false，但是Object.is返回true
  // 2. +0 === -0 在JS中返回true，但是Object.is返回false
  return !Object.is(oldValue, newValue);
}
