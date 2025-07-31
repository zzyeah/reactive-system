import { EffectOptions } from "./effectOptions.bean";

export interface Environment extends Function {
  options: EffectOptions;
  deps: Array<Set<Environment>>;
}
