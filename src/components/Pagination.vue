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

const pager: number[] = []
for (let i = 1; i < numPages + 1; i++) {
  if (i < current - 2) continue
  if (i > current + 2) continue
  pager.push(i)
}
</script>

<template>
  <div class="wrapper">
    <ul class="pager">
      <!--現在のページが2ページ目以降だったら前へ戻るボタンを設置-->
      <li v-if="current > 1" class="page arrow">
        <nuxt-link :to="getPath(current - 1)">
          <img
            src="../assets/images/icon_arrow_left.svg"
            width="24"
            height="24"
            alt="前のページへ"
          />
        </nuxt-link>
      </li>
      <!--現在のページが４ページ目以降だったら１ページ目を表示-->
      <li v-if="current > 3" class="page">
        <nuxt-link :to="getPath(1)"> 1 </nuxt-link>
      </li>
      <!--現在のページが５ページ目以降だったら...を打つ-->
      <li v-if="current > 4" class="omission">...</li>
      <!--配列の数字を書き出す-->
      <li v-for="p in pager" :key="p" class="page" :class="{ active: current === p }">
        <nuxt-link :to="getPath(p)">
          {{ p }}
        </nuxt-link>
      </li>
      <!--現在のページが全ページ数の-4以下だったら...を打つ-->
      <li v-if="current < numPages - 3" class="omission">...</li>
      <!--現在のページが全ページ数の-3以下だったら最後のページを表示-->
      <li v-if="current + 2 < numPages" class="page">
        <nuxt-link :to="getPath(numPages)">
          {{ numPages }}
        </nuxt-link>
      </li>
      <!--現在のページが最後のページでなかったら、次へボタンを設置-->
      <li v-if="current < numPages" class="page arrow">
        <nuxt-link :to="getPath(current + 1)">
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

<style scoped lang="scss">
li {
  list-style: none;
}

.wrapper {
  padding: 16px 0;
}

.pager {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 40px 0 0;
  font-size: var(--font-size-xl);
  font-weight: 500;
}

.omission {
  color: var(--c-gray-400);
  margin: 4px 12px;
}

.page {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  margin: 4px;

  &.arrow {
    margin: 4px 12px;
  }

  &.active {
    border: var(--border-1);
    border-color: var(--c-teal-400);

    a,
    a:hover {
      color: var(--c-teal-400);
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: var(--c-gray-600);

    &:hover {
      color: var(--c-gray-400);
    }
  }
}
</style>
