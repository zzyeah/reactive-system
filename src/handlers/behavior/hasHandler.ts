import track from "../../effect/track";
import { TrackOpTypes } from "../../types/trackOpTypes.bean";

function has<T extends Record<string | symbol, any>>(
  target: T,
  p: string | symbol
): boolean {
  track(target, TrackOpTypes.HAS, p);

  return Reflect.has(target, p);
}
export default has;
