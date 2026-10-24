<script setup lang="ts">
type Props = {
  numPages: number
  current: number
  tagId?: string
  keyword?: string
}

const { numPages, current, tagId, keyword } = defineProps<Props>()

function getPath(p: number) {
  if (tagId) return `/tags/${tagId}/page/${p}`
  if (keyword) return `/search?page=${p}&q=${keyword}`
  return `/page/${p}`
}

const linkClass = 'flex h-full items-center justify-center text-gray-600 hover:text-gray-400'
const activeLinkClass = 'flex h-full items-center justify-center text-teal-400'

const pager: number[] = []
for (let i = 1; i < numPages + 1; i++) {
  if (i < current - 2) continue
  if (i > current + 2) continue
  pager.push(i)
}
</script>

<template>
  <div class="py-4">
    <ul class="flex flex-wrap items-center justify-center pt-10 text-xl font-medium">
      <!--現在のページが2ページ目以降だったら前へ戻るボタンを設置-->
      <li v-if="current > 1" class="mx-3 my-1 size-10 rounded-[5px]">
        <nuxt-link :class="linkClass" :to="getPath(current - 1)">
          <img
            src="../assets/images/icon_arrow_left.svg"
            width="24"
            height="24"
            alt="前のページへ"
          />
        </nuxt-link>
      </li>
      <!--現在のページが４ページ目以降だったら１ページ目を表示-->
      <li v-if="current > 3" class="m-1 size-10 rounded-[5px]">
        <nuxt-link :class="linkClass" :to="getPath(1)"> 1 </nuxt-link>
      </li>
      <!--現在のページが５ページ目以降だったら...を打つ-->
      <li v-if="current > 4" class="mx-3 my-1 text-gray-400">...</li>
      <!--配列の数字を書き出す-->
      <li
        v-for="p in pager"
        :key="p"
        class="m-1 size-10 rounded-[5px]"
        :class="{ 'border border-teal-400': current === p }"
      >
        <nuxt-link :class="current === p ? activeLinkClass : linkClass" :to="getPath(p)">
          {{ p }}
        </nuxt-link>
      </li>
      <!--現在のページが全ページ数の-4以下だったら...を打つ-->
      <li v-if="current < numPages - 3" class="mx-3 my-1 text-gray-400">...</li>
      <!--現在のページが全ページ数の-3以下だったら最後のページを表示-->
      <li v-if="current + 2 < numPages" class="m-1 size-10 rounded-[5px]">
        <nuxt-link :class="linkClass" :to="getPath(numPages)">
          {{ numPages }}
        </nuxt-link>
      </li>
      <!--現在のページが最後のページでなかったら、次へボタンを設置-->
      <li v-if="current < numPages" class="mx-3 my-1 size-10 rounded-[5px]">
        <nuxt-link :class="linkClass" :to="getPath(current + 1)">
          <img
            src="../assets/images/icon_arrow_right.svg"
            width="24"
            height="24"
            alt="次のページへ"
          />
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
