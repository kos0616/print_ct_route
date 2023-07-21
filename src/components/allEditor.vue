<template>
  <nav class="flex justify-center mx-auto">
    <label title="變更表格顏色" class="menu-item">
      <input @input="changeColor" type="color" class="invisible w-0 h-0" />
      <i class="fa-solid fa-fill" style="color: var(--table-row-color)"></i>
    </label>
    <button title="變更文字大小" @click="changeFontSize" class="menu-item">
      <i class="fa-solid fa-text-height"></i>
    </button>
  </nav>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const color = ref("");

    const changeColor = (e: Event) => {
      document.documentElement.style.setProperty(
        "--table-row-color",
        (e.target as HTMLInputElement).value
      );
    };

    const activeSize = ref(1);

    const changeFontSize = () => {
      const dom = document.querySelector("#printer") as HTMLDivElement;
      if (!dom) return;
      const SIZE = ["80%", "100%", "120%"];
      const next = activeSize.value + 1;
      activeSize.value = next > SIZE.length - 1 ? 0 : next;
      dom.style.fontSize = SIZE[activeSize.value];
    };

    return { color, changeFontSize, changeColor };
  },
});
</script>

<style lang="postcss">
.is-sticky .menu-item {
  @apply border-gray-300;
}
.menu-item {
  @apply bg-white hover:bg-slate-100 border-transparent last:border-r border-l border-y py-2 px-3 cursor-pointer first:rounded-bl last:rounded-br relative;
}
</style>
