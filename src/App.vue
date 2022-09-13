<template>
  <div class="mx-auto">
    <!-- https://cyclingtips.com/2017/04/tour-flanders-tech-boonens-custom-rim-brake-roubaix-cobble-smoothing-comfort/ -->

    <div
      class="bg-no-repeat bg-center bg-cover bg-fixed relative"
      style="aspect-ratio: 5 / 1"
      :style="{
        'background-image': `url(${require('./assets/img/banner.jpg')})`,
      }"
    >
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 text-center">
        <h1 class="text-white text-5xl tracking-wider bg-gray-500 px-3 py-2">
          專屬於你的配速小抄
        </h1>
        <!-- style="text-shadow: 3px 2px 3px rgba(50, 50, 50, 1)" -->
        <a
          href="#intro"
          class="inline-block border px-3 py-2 text-white mt-3 rounded hover:bg-gray-700/90 bg-gray-700/75 transition-colors"
        >
          立即開始
        </a>
      </div>
    </div>
    <footer class="fixed right-5 bottom-5">
      <a
        href="https://github.com/kos0616/print_ct_route"
        title="作者: kos0616"
        class="hover:underline"
      >
        <i class="fa-brands fa-github"></i>
      </a>
    </footer>

    <div class="pt-10">
      <aboutCT class="mb-10 mx-auto" />
    </div>

    <div class="bg-stone-100 py-10">
      <intro class="mx-auto max-w-5xl" />
    </div>

    <div class="py-10" id="intro">
      <tutorial @upload="handleUploaded" />
    </div>

    <div
      v-if="Array.isArray(STEPS) && STEPS.length"
      class="px-3 py-2 lg:p-5 print:p-0"
    >
      <div class="w-full overflow-x-auto xl:overflow-visible">
        <preview :modelValue="STEPS" />
      </div>
    </div>

    <copyright />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import preview from "./components/preview.vue";
import intro from "./components/intro.vue";
import aboutCT from "./components/aboutCT.vue";
import tutorial from "./components/tutorial.vue";
import copyright from "./components/copyright.vue";

export default defineComponent({
  name: "App",
  components: { tutorial, preview, intro, aboutCT, copyright },
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

<style lang="postcss">
.title {
  @apply text-gray-700 font-bold tracking-wide mb-6;
}
p {
  @apply text-gray-600 text-sm;
}

/* @media screen {
  .A4 {
    aspect-ratio: 1.41 / 1;
    @apply border sm:max-w-lg md:max-w-4xl xl:max-w-6xl mx-auto p-3;
  }
} */
</style>
