<script setup lang="ts">
type Toc = {
  id: string
  name: string
  text: string
}
type Props = {
  toc: Toc[]
}
const { toc } = defineProps<Props>()

// 見出しレベルごとのインデント
const indentClass: Record<string, string> = {
  h1: 'ml-2',
  h2: 'ml-4',
  h3: 'ml-8',
}
</script>

<template>
  <ul
    class="my-4 border border-teal-400 p-4 pr-0 text-xs leading-[1.8] lg:sticky lg:top-[100px] lg:my-0 lg:ml-8"
  >
    <li v-for="item in toc" :key="item.id" class="mt-2" :class="indentClass[item.name]">
      <a class="text-gray-700 hover:text-teal-400 hover:opacity-90" :href="`#${item.id}`">
        {{ item.text }}
      </a>
    </li>
  </ul>
</template>
