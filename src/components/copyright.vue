<template>
  <footer
    class="text-center py-5 border-t border-stone-300 border-dashed bg-stone-100 relative"
  >
    <i
      class="icon-scissors absolute left-1/2 top-0 -translate-y-1/2 rotate-90"
    />
    <small class="block mb-2">自製分享、無廣告、無營利</small>
    <div class="flex justify-center gap-x-4">
      <div>
        <img
          src="https://img.shields.io/github/package-json/v/kos0616/print_ct_route?color=green"
          class="max-w-full h-auto inline-block"
          alt="版本編號"
          height="20"
          loading="lazy"
        />
      </div>
      <a href="https://github.com/kos0616/print_ct_route" target="_blank">
        <img
          src="https://img.shields.io/badge/%C2%A92022-kos0616-orange"
          class="max-w-full h-auto inline-block"
          alt="作者: kos0616"
          height="20"
          loading="lazy"
        />
      </a>
      <a
        href="https://github.com/kos0616/print_ct_route"
        title="作者: kos0616"
        class="hover:underline hover:text-orange-500"
      >
        <i class="icon-github"></i>
      </a>
      <message />
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import message from "./message.vue";
export default defineComponent({
  name: "copyright",
  components: { message },
});
</script>
