import track from "../../effect/track";
import { ReactiveTarget } from "../../types/reactive/reactiveData.bean";
import { TrackOpTypes } from "../../types/trackOpTypes.bean";

function ownKeysHandler<T extends ReactiveTarget>(
  target: T
): (string | symbol)[] {
  track(target, TrackOpTypes.ITERATE);

  return Reflect.ownKeys(target);
}
export default ownKeysHandler;
