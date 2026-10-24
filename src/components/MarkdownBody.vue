<script setup lang="ts">
import Prism from 'prismjs'

type Props = {
  body: string
}

const { body } = defineProps<Props>()

onMounted(() => Prism.highlightAll())
</script>
<template>
  <!-- 自分の microCMS から取得した HTML なので v-html で描画する -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="md" v-html="body"></div>
</template>

<style scoped>
/* microCMS から取得した HTML にはクラスを付けられないため、要素セレクタで装飾する */
.md :deep(*) {
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.9;
  font-size: var(--text-base);
}

.md :deep(p) {
  line-height: 1.8;
  white-space: pre-wrap;
}

.md :deep(p + p) {
  margin-top: calc(var(--spacing) * 2);
}

.md :deep(img) {
  display: block;
  max-width: 100%;
  margin-top: 20px;
  margin-bottom: 0;
  height: auto;
  border: solid 1px #ccc;
}

.md :deep(strong) {
  background-color: yellow;
}

.md :deep(p code) {
  padding-left: calc(var(--spacing) * 1);
  padding-right: calc(var(--spacing) * 1);
  border-radius: var(--radius-sm);
  margin: 0 calc(var(--spacing) * 2);
  background-color: var(--color-gray-100);
  color: var(--color-gray-800);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  display: inline-block;
}

.md :deep(pre) {
  margin-top: 1rem;
  padding: 2% 4%;
  border-radius: 5px;
}

.md :deep(pre *) {
  line-height: 1.6;
  font-weight: normal;
  font-size: var(--text-sm);
}

.md :deep(.toolbar-item) {
  font-size: var(--text-sm);
}

.md :deep(blockquote) {
  padding-left: 15px;
  margin: calc(var(--spacing) * 4) 0;
  border-left: 2px solid var(--color-gray-300);
  border-radius: 2px;
  color: var(--color-gray-500);
}

.md :deep(h1) {
  font-size: var(--text-xl);
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 10px;
}

.md :deep(h2) {
  border-bottom: 1px solid var(--color-gray-300);
}

.md :deep(h2),
.md :deep(h3) {
  font-size: var(--text-xl);
  margin-top: calc(var(--spacing) * 8);
  margin-bottom: calc(var(--spacing) * 4);
  font-weight: bold;
}

.md :deep(h4),
.md :deep(h5),
.md :deep(h6) {
  font-weight: bold;
}

.md :deep(a) {
  color: #1266f1;
}

.md :deep(ul),
.md :deep(ol) {
  padding-left: 1.5em;
  margin: 1rem 0;
  line-height: 1.7;
}

.md :deep(li) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.md :deep(ul) {
  list-style-type: disc;
}

.md :deep(ol) {
  list-style-type: decimal;
}
</style>
