<template>
  <div
    :class="{ 'z-10': CROP_INST }"
    class="print:hidden text-center border border-gray-300 hover:border-gray-400 transition-colors rounded-md arrow bg-white"
  >
    <label
      v-if="!CROP_INST"
      class="py-1 px-2 inline-block relative cursor-pointer"
      title="插入圖片"
    >
      <i class="icon-image text-gray-500" aria-label="插入圖片的標示"></i>
      <input
        @change="handelUpload"
        type="file"
        accept="image/*"
        class="opacity-0 hidden w-px h-px absolute left-1/2 bottom-1/2"
        required
      />
    </label>

    <div v-show="CROP_INST" ref="REF_CROP" class="z-20 py-2 px-2"></div>
    <div v-if="CROP_INST" class="text-center justify-center flex gap-x-2 pb-2">
      <button
        @click="removeCrop"
        type="button"
        class="border rounded py-1 px-3 border-gray-300 hover:bg-slate-100"
        title="取消"
      >
        <i class="icon-trash-alt text-red-500" aria-hidden="true" />
        取消
      </button>

      <button
        @click="getCrop"
        type="button"
        class="border rounded py-1 px-3 bg-blue-500 hover:bg-blue-600 text-white"
        title="確認"
      >
        <i class="icon-check" aria-hidden="true" />
        確認
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from "vue";
import Croppie from "croppie";
import "croppie/croppie.css";

/** 圖片插入 */
export default defineComponent({
  emits: ["change"],
  setup(props, { emit }) {
    const REF_CROP = ref(null as HTMLElement | null);
    const CROP_INST = ref(null as null | Croppie);
    const CROP_RESULT = ref("");

    const handelUpload = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (!target || target === null) return;
      const files = target.files || [];
      if (!files.length) return;

      const _reader = new FileReader();
      _reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setCrop(e.target?.result);
        }
      };
      _reader.readAsDataURL(files[0]);
    };

    /**
     * 若 Crop 尚未產生，則建立一個實體
     * 若已存在實體，則變更圖片
     */
    const setCrop = (url: string) => {
      if (CROP_INST.value !== null) {
        CROP_INST.value.bind({ url });
        return;
      }
      generateCrop(url);
    };

    /** 產生一個 Crop */
    const generateCrop = (url: string) => {
      const app = REF_CROP.value;
      if (app !== null) {
        CROP_INST.value = new Croppie(app, {
          viewport: { width: 160, height: 90 },
          boundary: { width: 160, height: 90 },
          customClass: "h-auto",
        });
        CROP_INST.value.bind({ url });
      }
    };

    const getCrop = () => {
      if (CROP_INST.value !== null) {
        CROP_INST.value
          .result({ type: "canvas", size: "original" })
          .then((d) => {
            emit("change", d);
          });
        removeCrop();
      }
    };

    const removeCrop = () => {
      if (CROP_INST.value) {
        CROP_INST.value?.destroy();
        CROP_INST.value = null;
        CROP_RESULT.value = "";
      }
    };

    onUnmounted(() => removeCrop());

    return {
      REF_CROP,
      handelUpload,
      getCrop,
      CROP_RESULT,
      CROP_INST,
      removeCrop,
    };
  },
});
</script>

<style lang="postcss" scoped>
.arrow::after {
  @apply absolute top-1/2 left-0 w-0 h-0 mx-auto -translate-y-1/2 -translate-x-full;
  content: "";
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-right: 7px solid #fff;
}
.arrow::before {
  @apply absolute top-1/2 left-0 w-0 h-0 mx-auto -translate-y-1/2 -translate-x-full transition-colors;
  content: "";
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 8px solid #ccc;
}
.arrow:hover::before {
  @apply border-l-gray-400;
}
</style>
