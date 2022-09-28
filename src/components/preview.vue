<template>
  <div>
    <!-- 全尺寸 -->
    <full :STEPS="STEPS" class="mb-5 hidden md:table print:table" />
    <div
      class="grid grid-cols-2 md:flex print:flex gap-x-14 justify-center items-start"
    >
      <div>
        <type_A :STEPS="STEPS" class="mb-5" />
      </div>
      <div>
        <type_A2 :STEPS="STEPS" class="mb-5" />
      </div>
      <div>
        <type_B :STEPS="STEPS" />
      </div>
      <div>
        <type_B2 :STEPS="STEPS" />
      </div>
    </div>

    <div
      class="text-center py-5 print:hidden border-t border-dashed border-gray-400 mt-5"
    >
      <button
        :disabled="!Array.isArray(STEPS) || !STEPS.length"
        onclick="window.print()"
        class="btn-print"
        title="列印小抄"
        type="button"
      >
        <i class="icon-print text-2xl" aria-hidden="true" />
        列印小抄
      </button>
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
