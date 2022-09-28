<template>
  <div class="md:flex gap-10">
    <lite-youtube
      videoid="PRmUBohZG9c"
      :style="{
        'background-image': `url(${require('../assets/img/hqdefault.webp')})`,
      }"
      class="w-full h-auto aspect-video mb-3"
    ></lite-youtube>

    <article class="sm:w-2/3 lg:w-full pt-3 lg:pt-0 mx-auto">
      <h2 class="text-2xl title mb-3">
        <i class="fa-regular fa-lightbulb fa-fw text-orange-500"></i>
        啟發自
        <a
          href="https://www.youtube.com/c/CTYeh"
          target="_blank"
          class="underline"
          title="前往 CT Yeh 的頻道"
          >CT Yeh</a
        >
        的配速器
      </h2>
      <blockquote
        cite="https://www.youtube.com/c/CTYeh/about"
        class="border border-stone-300 border-dashed py-2 px-3 rounded-md relative"
      >
        <i
          class="fa-solid fa-scissors absolute right-0 top-2/3 translate-x-1/2 rotate-90"
        />
        " 以自行車冒險、路線分析攻略、空拍、比賽實況、訓練台、3C
        等運動科技相關議題為主，歡迎訂閱鎖定 "
        <div class="text-right">
          <a
            href="https://www.youtube.com/c/CTYeh"
            target="_blank"
            title="前往 CT Yeh 的頻道"
          >
            <img
              src="https://img.shields.io/youtube/channel/subscribers/UC5AIxJqajtl41ZxCbiuoagA?label=%E8%A8%82%E9%96%B1%E6%88%90%E9%95%B7%E4%B8%AD"
              alt="CT Yeh 頻道的訂閱人數"
              class="max-w-full h-auto inline-block"
              width="116"
              height="20"
            />
          </a>
        </div>
      </blockquote>

      <blockquote
        cite="https://github.com/kos0616/print_ct_route"
        class="border border-stone-300 border-dashed py-2 px-3 rounded-md relative mt-10"
      >
        <i
          class="fa-solid fa-scissors absolute left-0 top-2/3 -translate-x-1/2 -rotate-90"
        />
        " 此站是在看了 CT Yeh 的 AI
        配速產生器特輯後，受到啟發而製作的，希望這個配速小抄產生器能幫助到車友。"
        <div class="text-right">- 作者</div>
      </blockquote>
    </article>
  </div>
</template>
