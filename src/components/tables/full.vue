<template>
  <table
    @mouseleave="active = null"
    class="table-auto table-striped border border-gray-600 table mx-auto"
    contenteditable
  >
    <thead>
      <tr>
        <th colspan="2">區段</th>
        <th>距離</th>
        <th>累積</th>
        <th>配瓦</th>
        <th>均速</th>
        <th>區段時間</th>
        <th>累積時間</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(step, i) in MY_STEPS"
        @mouseover="active = i"
        :key="`step_${i}`"
      >
        <td class="text-center">
          <i v-if="step.icon" :class="step.icon" class="fas text-xs fa-fw" />{{
            step.start || "-"
          }}
        </td>
        <td class="text-center">{{ step.end || "-" }}</td>
        <td class="text-right font-bold">
          {{ step.distance || "0" }}<small>k</small>
        </td>
        <td class="text-right font-bold">
          {{ step.cumulative_distance || "0" }}<small>k</small>
        </td>
        <td class="text-right font-bold">
          {{ step.wattage || "0" }}<small>w</small>
        </td>
        <td class="text-right font-bold">
          {{ step.average_speed || "0" }}<small>k/h</small>
        </td>
        <td class="text-center">{{ step.segment_time || "00:00" }}</td>
        <td class="text-center relative">
          {{ step.cumulative_time || "00:00" }}
          <editor
            v-if="active === i"
            @add="MY_STEPS.splice(i, 0, step)"
            @remove="MY_STEPS.splice(i, 1)"
            @icon="handleGetIcon"
          />
        </td>
      </tr>
    </tbody>
    <caption
      class="border border-gray-600 border-t-0"
      style="caption-side: bottom"
    >
      <div class="flex w-full py-1 px-3">
        <span></span>
        <span class="ml-auto">{{ now }}</span>
      </div>
    </caption>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import DAY from "dayjs";
import editor from "../tableEditor.vue";

/** 全幅版面 */
export default defineComponent({
  components: { editor },
  props: {
    STEPS: {
      type: Array as PropType<STEP[]>,
      default: () => [],
    },
  },
  setup: (props) => {
    const now = DAY().format("YYYY/MM/DD");

    const MY_STEPS = ref<Array<STEP & { icon?: string }>>([]);

    const active = ref<number | null>(null);

    /** 加入icon 若 icon 為同個圖樣，則移除 */
    const handleGetIcon = (icon: string) => {
      let newIcon = icon;
      if (active.value === null) return;
      if (MY_STEPS.value[active.value].icon === newIcon) newIcon = "";
      MY_STEPS.value[active.value].icon = newIcon;
    };

    watch(
      () => props.STEPS,
      (v) => {
        MY_STEPS.value = v.map((d) => ({ ...d }));
      },
      { immediate: true }
    );

    return { now, MY_STEPS, active, handleGetIcon };
  },
});
</script>
<style lang="postcss" scoped>
.table th,
.table td {
  @apply py-3 px-2 whitespace-nowrap border-y border-gray-600;
}
.table.table-striped tbody > tr:nth-child(2n) {
  background-color: var(--table-row-color);
}
</style>
