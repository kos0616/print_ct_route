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
          <td class="text-right">
            <i
              v-if="step.icon"
              :class="step.icon"
              class="fas text-xs fa-fw"
            />{{ step.cumulative_distance || "0" }}<small>k</small>
          </td>
          <td class="text-right">{{ step.wattage || "0" }}<small>w</small></td>
          <td class="relative">
            {{ step.cumulative_time || "00:00" }}
            <editor
              v-if="active === i"
              @add="MY_STEPS.splice(i, 0, step)"
              @remove="MY_STEPS.splice(i, 1)"
              @icon="handleGetIcon"
            />
          </td>
        </tr>
      </template>
    </tbody>
    <myCaption style="caption-side: bottom" />
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";
import myCaption from "../myCaption.vue";
import editor from "../tableEditor.vue";

export default defineComponent({
  components: { myCaption, editor },
  props: {
    STEPS: {
      type: Array as PropType<STEP[]>,
      default: () => [],
    },
  },
  setup(props) {
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

    return { MY_STEPS, active, handleGetIcon };
  },
});
</script>
<style lang="postcss" scoped>
.table th,
.table td {
  @apply py-0 px-1 whitespace-nowrap border-y border-gray-600;
}
.table.table-striped tbody > tr:nth-child(2n) {
  background-color: var(--table-row-color);
}

.table.table-striped tbody > tr:first-child {
  border-top: 0 !important;
}
</style>
