<template>
  <table
    @mouseleave="active = null"
    class="table-auto border table-striped table table-sm border-gray-600"
    contenteditable
  >
    <myCaption />
    <tbody>
      <template v-for="(step, i) in MY_STEPS" :key="`step_${i}`">
        <tr @mouseover="active = i">
          <td>
            <i
              v-if="step.icon"
              :class="step.icon"
              class="fas text-xs fa-fw"
            />{{ step.end || "-" }}
          </td>
          <td class="relative text-right">
            {{ step.cumulative_distance || "0" }}<small>k</small>
            <editor
              v-if="active === i"
              @add="MY_STEPS.splice(i, 0, step)"
              @remove="MY_STEPS.splice(i, 1)"
              @icon="handleGetIcon"
            />
          </td>
        </tr>

        <tr @mouseover="active = i">
          <td>{{ step.cumulative_time || "00:00" }}</td>
          <td class="text-right">{{ step.wattage || "0" }}<small>w</small></td>
        </tr>
      </template>
    </tbody>
    <myCaption style="caption-side: bottom" />
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef } from "vue";
import myCaption from "../myCaption.vue";
import editor from "../tableEditor.vue";
import { useSteps } from "@/composables/useSteps";

export default defineComponent({
  components: { myCaption, editor },
  props: {
    STEPS: {
      type: Array as PropType<STEP[]>,
      default: () => [],
    },
  },
  setup(props) {
    return useSteps(toRef(props, "STEPS"));
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
  background-color: var(--table-row-color);
}

.table.table-striped tbody > tr:nth-child(4n) {
  @apply border-b border-gray-600;
}
.table.table-striped tbody > tr:nth-child(4n-1) {
  @apply border-t border-gray-600;
}
</style>
