import { ReactiveTarget } from "./reactive/reactiveData.bean";

export type Reactive<T> = T extends ReactiveTarget
  ? {
      [K in keyof T]: T[K] extends ReactiveTarget ? Reactive<T[K]> : T[K];
    } & ReactiveTarget
  : T;
