export interface EffectOptions {
  lazy?: boolean;
  scheduler?: (fn: Function) => void; // 由用户决定处理依赖的函数
}
