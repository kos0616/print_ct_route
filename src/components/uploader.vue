<template>
  <div
    class="border-green-800 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
  >
    <label
      class="text-lg text-center px-4 py-3 relative block cursor-pointer"
      title="匯入 ride_plan.csv"
    >
      <template v-if="isUpload">
        <i class="fa-solid fa-check text-2xl fa-fw" aria-hidden="true" />
        匯入成功
      </template>
      <template v-else>
        <i class="fa-solid fa-file-csv text-2xl fa-fw" aria-hidden="true" />
        匯入 ride_plan.csv
      </template>
      <input
        @change="$emit('handleUpload', $event)"
        type="file"
        accept=".csv"
        class="w-0 h-0 absolute"
      />
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/** 檔案匯入 */
export default defineComponent({
  name: "uploader-tool",
  props: {
    isUpload: {
      type: Boolean,
      default: false,
    },
  },
});
</script>
