export type ComputedGetter<T> = () => T;

export interface ComputedOptions<T> {
  get: () => T;
  set: (value: T) => void;
}

export type ComputedParams<T> = ComputedGetter<T> | ComputedOptions<T>;
