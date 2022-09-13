<template>
  <article class="text-center mb-3">
    <h1 class="text-2xl font-bold mb-3">CT Yeh 路段配速器 小抄產生器</h1>
    <p class="mb-2">
      請至
      <a
        href="https://www.ctyeh.com/routelist"
        target="_blank"
        class="hover:underline text-green-700"
        title="前往 CT Yeh 公路車基地"
      >
        CT Yeh 公路車基地
      </a>
      取得配速小抄， 再進行上傳與列印。
    </p>
    <p>列印後剪下，經護貝或用膠帶黏貼正反兩面即可防水。</p>
  </article>
  <div class="flex gap-x-4 justify-center">
    <uploader @handleUpload="handleUpload" />
    <button
      onclick="window.print()"
      v-if="Array.isArray(STEPS) && STEPS.length"
      class="text-lg text-center px-4 py-3 relative block border rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      title="列印小抄"
      type="button"
    >
      <i class="fas fa-print"></i>
      列印小抄
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import uploader from "./uploader.vue";

export default defineComponent({
  components: { uploader },
  setup(props, { emit }) {
    /** 區段 */
    const STEPS = ref<STEP[]>([]);

    /** 讀取 .csv 檔案 並放在 STEPS */
    const handleUpload = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      /** 無檔案，停止 */
      if (!files?.length) return;

      const file = files[0];
      loadCSV(file);
    };

    /** 讀取 CSV，將其放在 STEPS*/
    const loadCSV = (file: File) => {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function () {
        const RAW_DATA = reader.result as string;
        if (!RAW_DATA) return;
        /** 以 \r\n 作為每一列的斷點 */
        const ARR_DATA = RAW_DATA.split("\r\n");
        /** 檔案格式錯誤 */
        if (!ARR_DATA || ARR_DATA.length === 0) {
          alert("檔案格式錯誤");
          return;
        }

        /** 去除表頭 */
        const DATAS = ARR_DATA.slice(1);

        /** 以 "," 作為每攔的斷點 取得 路段、距離、累積距離、配瓦、均速、區段時間、累計時間 */
        const result = DATAS.map((str) => str.split(",")).filter(
          (n) => n.length > 1
        );
        STEPS.value = formatCSV(result);

        if (Array.isArray(STEPS.value) && STEPS.value.length)
          emit("upload", STEPS.value);
      };
    };

    const formatCSV = (arr: string[][]): STEP[] => {
      return arr.map((step) => ({
        start: step[0].split("-")[0],
        end: step[0].split("-")[1],
        distance: step[1],
        cumulative_distance: step[2],
        wattage: step[3],
        average_speed: step[4],
        segment_time: step[5],
        cumulative_time: step[6],
      }));
    };

    return { handleUpload, STEPS };
  },
});
</script>
