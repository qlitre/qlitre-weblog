<script setup lang="ts">
type Props = {
  keyword?: string
}

const { keyword } = defineProps<Props>()

const query = ref(keyword)

function canSubmit() {
  return !!query.value && !/^\s+$/.test(query.value)
}

function submit() {
  if (canSubmit()) {
    return navigateTo({
      path: '/search',
      query: {
        q: query.value,
      },
    })
  }
}
</script>

<template>
  <form class="search-form" @submit.prevent="submit">
    <input type="text" v-model="query" ref="searchForm" placeholder="Keyword" />
  </form>
</template>

<style scoped lang="scss">
input[type='text'] {
  font-size: var(--font-size-base);
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 10px;
  border: solid 1px #ccc;
  background-color: #fff;
  font-family: 'Ubuntu', 'Noto Sans JP', sans-serif;
  display: inline-block;
  width: 240px;
  height: 28px;
}

input[type='text']:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}
</style>
