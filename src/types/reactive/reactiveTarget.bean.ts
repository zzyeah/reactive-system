import { Environment } from "../effect/environment.bean";
import { TrackOpTypes } from "../trackOpTypes.bean";

export type ReactiveKey = string | symbol;

export type ReactiveTarget = Record<ReactiveKey, any>;

export type TargetMap = Map<ReactiveTarget, PropMap>;

export type PropMap = Map<ReactiveKey, TypeMap>;

export type TypeMap = Map<TrackOpTypes, Set<Environment>>;
