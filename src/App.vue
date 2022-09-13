<template>
  <div class="mx-auto print:hidden">
    <div class="pb-10">
      <myHeader />
    </div>

    <div class="px-5 lg:px-0">
      <div class="lg:py-10 mb-10">
        <aboutCT class="max-w-5xl mx-auto" />
      </div>
    </div>

    <div class="bg-stone-100 lg:py-10">
      <intro class="mx-auto max-w-5xl" />
    </div>

    <div
      :class="{
        'border-b border-gray-300 border-dashed':
          Array.isArray(STEPS) && STEPS.length,
      }"
      class="py-20"
      id="intro"
    >
      <tutorial @upload="handleUploaded" class="mx-auto max-w-5xl" />
    </div>
  </div>

  <div
    v-if="Array.isArray(STEPS) && STEPS.length"
    class="px-3 py-2 lg:p-5 print:p-0"
  >
    <div class="w-full overflow-x-auto xl:overflow-visible">
      <preview :modelValue="STEPS" />
    </div>
  </div>

  <copyright class="print:hidden" />
  <footer class="print:hidden fixed right-5 bottom-5">
    <a
      href="https://github.com/kos0616/print_ct_route"
      title="作者: kos0616"
      class="hover:underline"
    >
      <i class="fa-brands fa-github"></i>
    </a>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import preview from "./components/preview.vue";
import intro from "./components/intro.vue";
import aboutCT from "./components/aboutCT.vue";
import tutorial from "./components/tutorial.vue";
import copyright from "./components/copyright.vue";
import myHeader from "./components/header.vue";

export default defineComponent({
  name: "App",
  components: { myHeader, tutorial, preview, intro, aboutCT, copyright },
  setup() {
    /** 區段 */
    const STEPS = ref<STEP[]>([]);

    /** 讀取 .csv 檔案 並放在 STEPS */
    const handleUploaded = (arr: STEP[]) => {
      STEPS.value = arr;
    };

    return { handleUploaded, STEPS };
  },
});
</script>

<style>
* {
  font-family: Microsoft JhengHei, sans-serif;
}

@media print {
  tr {
    -webkit-print-color-adjust: exact;
  }
  @page {
    size: A4;
    margin: 0px;
  }
}
</style>
