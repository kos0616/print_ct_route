<template>
  <table
    class="table-auto border table-striped table table-sm border-gray-600"
    contenteditable
  >
    <myCaption />
    <tbody>
      <template v-for="(step, i) in STEPS" :key="`step_${i}`">
        <tr>
          <td class="text-right">
            {{ step.cumulative_distance }}<small>k</small>
          </td>
          <td class="text-right">{{ step.average_speed }}<small>k/h</small></td>
          <td>{{ step.cumulative_time }}</td>
        </tr>
      </template>
    </tbody>
    <myCaption style="caption-side: bottom" />
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import myCaption from "../myCaption.vue";

export default defineComponent({
  components: { myCaption },
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
  @apply py-0 px-1 whitespace-nowrap border-y border-gray-600;
}
.table.table-striped tbody > tr:nth-child(2n) {
  @apply bg-sky-200;
}

.table.table-striped tbody > tr:first-child {
  border-top: 0 !important;
}
</style>
