import track from "../../effect/track";
import { TrackOpTypes } from "../../types/trackOpTypes.bean";

function ownKeysHandler<T extends Record<string | symbol, any>>(
  target: T
): (string | symbol)[] {
  track(target, TrackOpTypes.ITERATE);

  return Reflect.ownKeys(target);
}
export default ownKeysHandler;
