<template>
  <button
    @click="handleOpenMsg"
    title="留言給我"
    class="hover:text-orange-400 text-sm"
  >
    <i class="fa-regular fa-comment fa-fw"></i>
    留言
  </button>
  <div
    @keyup.esc="closed = !closed"
    v-if="!closed"
    @click.self="closed = !closed"
    class="fadeIn fixed bg-gray-600/60 backdrop-blur-sm top-0 bottom-0 left-0 right-0 flex justify-center flex-wrap content-center"
  >
    <div class="rounded border-2 border-orange-400 p-4 py-5 bg-white">
      <div class="relative">
        <button
          @click="closed = !closed"
          title="關閉"
          class="px-3 hover:text-orange-400 absolute top-0 right-0"
        >
          <i class="fas fa-times"></i>
        </button>
        <form @submit.prevent="handleSubmit">
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
import Swal from "sweetalert2";

export default defineComponent({
  setup() {
    const closed = ref(true);

    const msg = ref("");

    const REF_INPUT = ref<HTMLTextAreaElement | null>(null);

    const handleOpenMsg = () => {
      closed.value = !closed.value;

      setTimeout(() => {
        if (REF_INPUT.value) {
          REF_INPUT.value?.focus();
        }
      }, 300);
    };

    const handleSubmit = async () => {
      const url = "https://api.val.town/v1/run/kos0616.callme";
      const json = JSON.stringify(msg.value);

      await fetch(`${url}?args=[${json}]`)
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "已收到您寶貴的留言",
            html: msg.value,
          });
          // Handle the data received from the API
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "被玩壞了... :-(",
            html:
              "留言功能故障了，如果您方便的話，請直接寄信告知我，謝謝\n" +
              '<a class="hover:bg-gray-100 my-2 py-2 border block rounded" href="mailto:javert0616@gmail.com"><i class="fas fa-envelope fa-fw"></i>Email</a>',
          });
          // Handle any errors that occurred during the fetch
        });
    };
    return { closed, handleSubmit, msg, handleOpenMsg, REF_INPUT };
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
