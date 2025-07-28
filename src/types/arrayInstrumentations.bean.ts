export const arrayCollectInstrumentationsTypes = [
  "includes",
  "indexOf",
  "lastIndexOf",
] as const;

export const arrayPauseInstrumentationsTypes = [
  "push",
  "pop",
  "shift",
  "unshift",
] as const;
export const arrayInstrumentationsTypes = [
  ...arrayCollectInstrumentationsTypes,
  ...arrayPauseInstrumentationsTypes,
] as const;

export type ArrayCollectInstrumentationsType =
  (typeof arrayCollectInstrumentationsTypes)[number];

export type ArrayPauseInstrumentationsType =
  (typeof arrayPauseInstrumentationsTypes)[number];

export type ArrayInstrumentationsType =
  (typeof arrayInstrumentationsTypes)[number];

export type ArrayInstrumentations = {
  [K in ArrayInstrumentationsType]?: (this: any[], ...args: any[]) => any;
};
