import { cleanup, effect } from "../effect/effect";
import { WatchOptions } from "../types/watch/watchOptions.bean";
import { WatchSource } from "../types/watch/watchSource.bean";
import { traverse } from "../utils/watch.util";

function watch<T>(
  source: WatchSource<T>,
  cb: (newValue: T, oldValue: T) => void,
  options: WatchOptions = {}
) {
  // 1. 参数归一化
  // 这里没有考虑数组的情况
  let getter;
  if (typeof source === "function") {
    getter = <() => T>source;
  } else {
    getter = () => traverse(source);
  }

  let oldValue: any, newValue; // 用于存储 getter 上一次的值和当前值

  const job = () => {
    newValue = effectFn();
    cb(newValue, oldValue);
    oldValue = newValue;
  };

  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      switch (options.flush) {
        case "post":
          Promise.resolve().then(job);
          break;
        case "sync":
        case "pre":
        default:
          job();
          break;
      }
    },
  });

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }

  return () => {
    cleanup(effectFn);
  };
}

export default watch;
