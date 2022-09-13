<template>
  <div class="grid gap-y-5 gap-x-2 justify-center items-start h-full">
    <!-- 全尺寸 -->
    <div class="col-span-2">
      <full :STEPS="STEPS" />
    </div>
    <div>
      <!-- 配速 -->
      <type_A :STEPS="STEPS" class="mb-5" />
      <type_B :STEPS="STEPS" />
    </div>

    <div>
      <!-- 配瓦 -->
      <type_A2 :STEPS="STEPS" class="mb-5" />
      <type_B2 :STEPS="STEPS" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import full from "./tables/full.vue";
import type_A from "./tables/type_A.vue";
import type_A2 from "./tables/type_A2.vue";
import type_B from "./tables/type_B.vue";
import type_B2 from "./tables/type_B2.vue";

export default defineComponent({
  name: "print preview",
  components: { full, type_A, type_A2, type_B, type_B2 },
  props: {
    modelValue: {
      type: Array as PropType<STEP[]>,
      default: () => [],
    },
  },
  setup(props) {
    /** 格式化地名 */
    const formatPlaceName = (str: string) => {
      switch (str) {
        case "最高小七":
          return "小七";

        default:
          return str;
      }
    };

    const STEPS = computed(() => {
      return props.modelValue.map((obj) => ({
        ...obj,
        start: formatPlaceName(obj.start),
        end: formatPlaceName(obj.end),
        /** 距離 */
        distance: Number(obj.distance).toFixed(1),
        /** 累積距離 */
        cumulative_distance: Number(obj.cumulative_distance).toFixed(1),
        /** 配瓦 */
        wattage: obj.wattage,
        /** 均速 */
        average_speed: Math.floor(Number(obj.average_speed)),
        /** 區段時間 */
        segment_time: showTimer(obj.segment_time),
        /** 累計時間 */
        cumulative_time: showTimer(obj.cumulative_time),
      }));
    });

    /** 簡化時間的顯示 */
    const showTimer = (time: string) => {
      const arr = time.split(":");
      return arr[0] + ":" + arr[1];
    };

    return { STEPS, formatPlaceName };
  },
});
</script>
