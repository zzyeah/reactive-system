export interface WatchOptions {
  immediate?: boolean;
  once?: boolean;
  flush?: WatchOptionFlush;
}

export type WatchOptionFlush = "post" | "pre" | "sync";
