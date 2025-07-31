import { computed } from "./computed/computed";
import { effect } from "./effect/effect";
import { reactive } from "./reactive";

const state = reactive({
  a: 1,
  b: 2,
  c: 3,
});
const sum = computed(() => {
  console.log("computed");
  return state.a + state.b;
});

effect(() => {
  console.log(sum.value);
});

state.a = 2;
