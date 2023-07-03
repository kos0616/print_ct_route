<template>
  <div
    class="z-20 absolute right-0 -top-2 print:hidden px-1 py-2"
    style="transform: translateX(calc(100% + 1px))"
  >
    <div
      class="grid arrow relative text-gray-600 border border-gray-300 rounded-md p-1 text-sm bg-white"
      contenteditable="false"
    >
      <button
        @click="$emit('add')"
        title="增加列"
        class="p-1 hover:text-green-600"
      >
        <i class="fa-solid fa-plus fa-fw"></i>
      </button>
      <button
        @click="$emit('remove')"
        title="刪除列"
        class="p-1 hover:text-red-500"
      >
        <i class="fa-solid fa-trash-can fa-fw"></i>
      </button>
      <button
        @click="iconOpened = !iconOpened"
        title="加入icon"
        class="p-1 hover:text-blue-600"
      >
        <strong>icon</strong>
      </button>
      <div v-if="iconOpened" class="grid grid-cols-2 py-1 border-t gap-1">
        <button
          @click="$emit('icon', css)"
          v-for="(css, i) in icons"
          :key="`icon${i}`"
          class="hover:text-orange-500"
        >
          <i :class="css" class="fas fa-fw"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// TODO: text color
// TODO: row color
// TODO: text size
const icons = [
  "fa-star",
  "fa-flag",
  "fa-solid fa-arrow-trend-up",
  "fa-arrow-trend-down",
  "fa-droplet",
  "fa-utensils",
  "fa-truck-droplet",
  "fa-truck",
];

export default defineComponent({
  emits: ["add", "remove", "icon"],
  setup() {
    const iconOpened = ref<boolean>(false);

    return { iconOpened, icons };
  },
});
</script>

<style lang="postcss" scoped>
.arrow::after {
  @apply absolute top-2 left-0 w-0 h-0 mx-auto -translate-y-1/2 -translate-x-full;
  content: "";
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 7px solid #fff;
}
.arrow::before {
  @apply absolute top-2 left-0 w-0 h-0 mx-auto -translate-y-1/2 -translate-x-full transition-colors;
  content: "";
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 8px solid #ccc;
}
.arrow:hover::before {
  @apply border-l-gray-400;
}
</style>
