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
  <form @submit.prevent="submit">
    <input
      ref="searchForm"
      v-model="query"
      class="inline-block h-7 w-60 rounded-[10px] border border-[#ccc] bg-white px-2 py-1 font-['Ubuntu','Noto_Sans_JP',sans-serif] text-base text-black focus:shadow-[0_0_0_0.25rem_rgba(13,110,253,0.25)] focus:outline-0"
      type="text"
      placeholder="Keyword"
    />
  </form>
</template>
