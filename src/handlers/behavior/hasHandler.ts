import track from "../../effect/track";
import { ReactiveTarget } from "../../types/reactive/reactiveTarget.bean";
import { TrackOpTypes } from "../../types/trackOpTypes.bean";

function has<T extends ReactiveTarget>(target: T, p: string | symbol): boolean {
  track(target, TrackOpTypes.HAS, p);

  return Reflect.has(target, p);
}
export default has;
