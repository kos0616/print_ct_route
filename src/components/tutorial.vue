<template>
  <div>
    <div class="md:flex gap-x-10 items-center justify-between px-5 xl:px-0">
      <article class="w-full sm:w-2/3 lg-w-1/2 mb-5 md:mb-0 mx-auto">
        <h2 class="text-2xl title">我該如何上手？</h2>
        <ol class="list-decimal pl-5">
          <li>
            前往
            <b>CT Yeh 公路車基地</b>，在單車路線頁選擇配速。
          </li>
          <li>下載小抄 檔名為 <b>ride_plan.csv</b>。</li>
          <li>
            <b class="bg-green-600 text-white px-1 rounded"
              >匯入 配速產生器.csv</b
            >
            匯入成功可在底下預覽與編輯。
          </li>
          <li>
            <b class="bg-blue-500 text-white px-1 rounded">列印小抄</b>
            取得您獨一無二的配速表，或是上傳至超商雲端列印。
          </li>
          <li>列印後剪下，經護貝或用膠帶黏貼正反兩面即可防水。</li>
        </ol>
      </article>

      <div
        class="w-full sm:w-2/3 lg-w-1/2 flex gap-x-4 justify-center text-center items-start mx-auto"
      >
        <div class="mb-5 md:mb-0">
          <uploader @handleUpload="handleUpload" :isUpload="isUpload" />
          <a
            href="https://www.ctyeh.com/routelist"
            target="_blank"
            class="underline text-green-700 my-8 lg:mt-3 lg:mb-0 block"
            title="前往 CT Yeh 公路車基地"
          >
            取得配速表
          </a>
        </div>
        <div class="text-center">
          <button
            :disabled="!isUpload"
            onclick="window.print()"
            class="btn-print"
            title="列印小抄"
            type="button"
          >
            <i class="icon-print md:text-2xl" aria-hidden="true" />
            列印小抄
          </button>
          <a
            href="https://print.ibon.com.tw/ibonprinter"
            target="_blank"
            class="underline text-green-700 my-8 lg:mt-3 lg:mb-0 block"
            title="使用 7-11 雲端列印"
          >
            7-11 雲端列印
          </a>
          <a
            href="https://print.famiport.com.tw/"
            target="_blank"
            class="underline text-green-700 my-8 lg:mt-3 lg:mb-0 block"
            title="使用全家雲端列印"
          >
            全家雲端列印
          </a>
        </div>
      </div>
    </div>
    <hr class="my-3" />
    <article>
      <h2 class="text-xl title mb-2">編輯區使用教學</h2>
      <p>編輯區內的所有文字都可自由編輯，包含表格的標題與內容。</p>
      <p><i class="fa-solid fa-fill"></i> 改變表格顏色</p>
      <p><i class="fa-solid fa-text-height"></i> 改變文字大小</p>
      <p><i class="icon-image"></i> 為表格加入圖片</p>
      <p><i class="fa-solid fa-plus"></i> 新增一列表格</p>
      <p><i class="fa-solid fa-trash-alt"></i> 刪除一列表格</p>
      <p><i>icon</i> 為該區段加上標記</p>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
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
        start: extractPlaceNames(step[0]).start,
        end: extractPlaceNames(step[0]).end,
        distance: step[1],
        cumulative_distance: step[2],
        wattage: step[3],
        average_speed: step[4],
        segment_time: step[5],
        cumulative_time: step[6],
      }));

      function extractPlaceNames(str: string) {
        const matchType_1 = /Section_\d+ (\S+?)_(\S+)/g.exec(str);
        if (matchType_1 !== null) {
          return { start: matchType_1[1], end: matchType_1[2] };
        }

        const matchType_2 = /(\S+?)[-_](\S+)/g.exec(str);
        if (matchType_2 !== null) {
          return { start: matchType_2[1], end: matchType_2[2] };
        }

        return { start: "", end: "" };
      }
    };

    const isUpload = computed(
      () => Array.isArray(STEPS.value) && STEPS.value.length > 0
    );

    return { handleUpload, STEPS, isUpload };
  },
});
</script>
