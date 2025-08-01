import { EffectOptions } from "../types/effect/effectOptions.bean";
import { Environment } from "../types/effect/environment.bean";
import { TargetMap } from "../types/reactive/reactiveData.bean";

export let activeEffect: Environment;
export const targetMap = <TargetMap>new Map(); // 用于存储对象和其属性的依赖关系
const effectStack: Environment[] = []; // 模拟函数栈

export function effect(fn: Function, opts: EffectOptions = {}) {
  const { lazy = false } = opts;
  const environment: Environment = () => {
    try {
      activeEffect = environment;
      effectStack.push(environment);
      cleanup(environment);
      return fn();
    } catch (error) {
      console.warn(`effect error:`);
      console.warn(error);
      console.warn(`--------------`);
    } finally {
      effectStack.pop();
      activeEffect = effectStack[environment.length - 1];
    }
  };
  environment.deps = [];
  environment.options = opts;
  if (!lazy) {
    environment();
  }
  return environment;
}

export function cleanup(environment: Environment) {
  const deps = environment.deps;
  if (deps.length) {
    deps.forEach((dep) => {
      dep.delete(environment);
    });
    deps.length = 0;
  }
}
