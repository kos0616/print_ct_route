<template>
  <caption
    :class="{ 'border-dashed border border-gray-400 ': !top_img }"
    class="print:border-0 relative"
  >
    <imgUploader
      @change="handleImgUpload"
      class="absolute right-0 top-0"
      style="transform: translateX(calc(100% + 10px))"
      contenteditable="false"
    />
    <img
      @click="top_img = ''"
      v-if="top_img"
      :src="top_img"
      class="cursor-pointer hover:opacity-50 transition-opacity"
      title="刪除圖片"
      loading="lazy"
    />
    <br v-else />
  </caption>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import imgUploader from "./imgUploader.vue";

/** 帶圖片插入器的 caption */
export default defineComponent({
  name: "caption with image uploader",
  components: { imgUploader },
  setup() {
    const top_img = ref("");

    const handleImgUpload = (v: string) => {
      top_img.value = v;
    };

    return { top_img, handleImgUpload };
  },
});
</script>
