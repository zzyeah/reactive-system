export type Reactive<T> = T extends Record<string | symbol, any>
  ? {
      [K in keyof T]: T[K] extends Record<string | symbol, any>
        ? Reactive<T[K]>
        : T[K]
    } & Record<string | symbol, any>
  : T;
