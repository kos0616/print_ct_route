<template>
  <div>
    <div
      class="border-green-800 rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors max-w-sm"
    >
      <label
        title="上傳 ride_plan.csv"
        class="text-lg text-center px-4 py-3 relative block cursor-pointer"
      >
        <i class="fa-solid fa-file-csv text-2xl fa-fw" aria-hidden="true" />
        上傳 ride_plan.csv
        <input
          @change="$emit('handleUpload', $event)"
          type="file"
          accept=".csv"
          class="w-0 h-0 absolute"
        />
      </label>
    </div>
    <div class="text-center">
      <a
        href="https://www.ctyeh.com/routelist"
        target="_blank"
        class="underline text-green-700 mt-3 block"
        title="前往 CT Yeh 公路車基地"
      >
        Get ride_plan.csv
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

/** 檔案上傳 */
export default defineComponent({
  name: "uploader-tool",
});
</script>
