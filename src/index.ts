import { reactive } from "./reactive";
import watch from "./watch/watch";

const x = reactive({
  a: 1,
  b: 2,
});
watch(
  () => x.a + x.b,
  (newValue, oldValue) => {
    console.log("sum is " + newValue + " oldValue is " + oldValue);
  },
  { immediate: true }
);
x.a++;
