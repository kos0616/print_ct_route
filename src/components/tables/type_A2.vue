<template>
  <table
    class="table-auto border table-striped table table-sm border-gray-600"
    contenteditable
  >
    <myCaption />
    <tbody>
      <template v-for="(step, i) in STEPS" :key="`step_${i}`">
        <tr>
          <td>{{ step.end }}</td>
          <td class="text-right">
            {{ step.cumulative_distance }}<small>k</small>
          </td>
        </tr>

        <tr>
          <td>{{ step.cumulative_time }}</td>
          <td class="text-right">{{ step.wattage }}<small>w</small></td>
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
  @apply py-0 px-1 whitespace-nowrap;
}
.table.table-striped tbody > tr:nth-child(4n),
.table.table-striped tbody > tr:nth-child(4n-1) {
  @apply bg-sky-200;
}

.table.table-striped tbody > tr:nth-child(4n) {
  @apply border-b border-gray-600;
}
.table.table-striped tbody > tr:nth-child(4n-1) {
  @apply border-t border-gray-600;
}
</style>
