<template>
  <table
    class="w-1/2 table-auto table-striped border border-gray-600 table mx-auto"
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
      <tr v-for="(step, i) in STEPS" :key="`step_${i}`">
        <td class="text-center">{{ step.start }}</td>
        <td class="text-center">{{ step.end }}</td>
        <td class="text-right font-bold">
          {{ step.distance }}<small>k</small>
        </td>
        <td class="text-right font-bold">
          {{ step.cumulative_distance }}<small>k</small>
        </td>
        <td class="text-right font-bold">{{ step.wattage }}<small>w</small></td>
        <td class="text-right font-bold">
          {{ step.average_speed }}<small>k/h</small>
        </td>
        <td class="text-center">{{ step.segment_time }}</td>
        <td class="text-center">{{ step.cumulative_time }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

/** 全幅版面 */
export default defineComponent({
  props: {
    STEPS: {
      type: Array as PropType<STEP[]>,
      default: () => [],
    },
  },
});
</script>
<style lang="postcss" scoped>
.table th,
.table td {
  @apply py-3 px-2 whitespace-nowrap border-y border-gray-600;
}
.table.table-striped tbody > tr:nth-child(2n) {
  @apply bg-sky-200;
}
</style>
