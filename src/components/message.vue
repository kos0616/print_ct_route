<template>
  <button
    @click="handleOpenMsg"
    title="留言給我"
    class="hover:text-orange-400 text-sm"
  >
    <i class="icon-comment icon-fw"></i>
    留言
  </button>
  <div
    v-if="!closed"
    @keyup.esc="handleClose"
    @click.self="handleClose"
    class="fadeIn fixed bg-gray-600/60 backdrop-blur-sm top-0 bottom-0 left-0 right-0 flex justify-center flex-wrap content-center"
  >
    <div class="rounded border-2 border-orange-400 p-4 py-5 bg-white">
      <div class="relative">
        <button
          @click="handleClose"
          title="關閉"
          class="px-3 hover:text-orange-400 absolute top-0 right-0"
        >
          <i class="icon-times"></i>
        </button>
        <div v-if="result" class="text-center max-w-sm">
          <i
            :class="
              result.ok
                ? 'icon-check text-green-600'
                : 'icon-times text-red-500'
            "
            class="text-4xl block mb-3"
          ></i>
          <p class="text-base text-gray-800 mb-2">{{ result.title }}</p>
          <p class="mb-3 whitespace-pre-wrap break-words">{{ result.body }}</p>
          <a
            v-if="!result.ok"
            href="mailto:javert0616@gmail.com"
            class="hover:bg-gray-100 my-2 py-2 border block rounded"
          >
            <i class="icon-envelope-o icon-fw"></i>Email
          </a>
          <button
            @click="handleClose"
            title="關閉"
            class="border px-5 py-1 rounded hover:bg-orange-400 hover:text-white transition-colors"
            type="button"
          >
            關閉
          </button>
        </div>
        <form v-else @submit.prevent="handleSubmit">
          <label for="message" class="block mb-3">留言給作者</label>
          <textarea
            v-model="msg"
            placeholder="請在此輸入您想說的話"
            id="message"
            name="message"
            rows="4"
            cols="50"
            required
            class="border p-2"
            ref="REF_INPUT"
          ></textarea>
          <p class="mb-3">若您遇到了bug，請在這邊留言，也歡迎許願新功能哦。</p>
          <button
            title="送出留言"
            type="submit"
            class="border px-5 py-1 rounded hover:bg-orange-400 hover:text-white transition-colors"
          >
            送出
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

/** 送出後的結果，null 時顯示表單 */
type Result = { ok: boolean; title: string; body: string };

export default defineComponent({
  setup() {
    const closed = ref(true);

    const msg = ref("");

    const result = ref<Result | null>(null);

    const REF_INPUT = ref<HTMLTextAreaElement | null>(null);

    const handleOpenMsg = () => {
      closed.value = false;
      result.value = null;

      setTimeout(() => {
        if (REF_INPUT.value) {
          REF_INPUT.value?.focus();
        }
      }, 300);
    };

    const handleClose = () => {
      closed.value = true;
      result.value = null;
    };

    const handleSubmit = async () => {
      const url = "https://api.val.town/v1/run/kos0616.callme";
      const json = JSON.stringify(msg.value);

      try {
        const response = await fetch(`${url}?args=[${json}]`);
        if (!response.ok) throw new Error("Network response was not ok");
        await response.json();
        result.value = {
          ok: true,
          title: "已收到您寶貴的留言",
          body: msg.value,
        };
      } catch (error) {
        console.error("Error:", error);
        result.value = {
          ok: false,
          title: "被玩壞了... :-(",
          body: "留言功能故障了，如果您方便的話，請直接寄信告知我，謝謝",
        };
      }
    };

    return {
      closed,
      result,
      handleSubmit,
      handleClose,
      msg,
      handleOpenMsg,
      REF_INPUT,
    };
  },
});
</script>

<style scoped>
.fadeIn {
  animation: fadeIn 0.3s ease-in forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
