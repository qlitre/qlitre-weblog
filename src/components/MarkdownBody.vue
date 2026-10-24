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

<style scoped lang="scss">
.md {
  :deep(*) {
    margin-top: 0;
    margin-bottom: 1rem;
    line-height: 1.9;
    font-size: var(--font-size-base);
  }

  :deep(p) {
    line-height: 1.8;
    white-space: pre-wrap;
    font-size: var(--font-size-md);

    + p {
      margin-top: var(--spacing-2);
    }
  }

  :deep(img) {
    display: block;
    max-width: 100%;
    margin-top: 20px;
    margin-bottom: 0px;
    height: auto;
    border: solid 1px #ccc;
  }

  :deep(strong) {
    background-color: yellow;
  }

  :deep(p) code {
    padding-left: var(--spacing-1);
    padding-right: var(--spacing-1);
    border-radius: var(--radius-sm);
    margin: 0 var(--spacing-2);
    background-color: var(--c-gray-100);
    color: var(--c-gray-800);
    font-family: var(--fonts-mono);
    font-size: var(--font-size-sm);
    display: inline-block;
  }

  :deep(pre) {
    margin-top: 1rem;
    padding: 2% 4%;
    border-radius: 5px;
  }

  :deep(pre) * {
    line-height: 1.6;
    font-weight: normal;
    font-size: var(--font-size-sm);
  }

  :deep(.toolbar-item) {
    font-size: var(--font-size-sm);
  }

  :deep(blockquote) {
    padding-left: 15px;
    margin: var(--spacing-4) 0;
    border-left: 2px solid var(--c-gray-300);
    border-radius: 2px;
    color: var(--c-gray-500);
  }

  :deep(h1) {
    font-size: var(--font-size-xl);
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  :deep(h2) {
    border-bottom: 1px solid var(--c-gray-300);
  }

  :deep(h2),
  :deep(h3) {
    font-size: var(--font-size-xl);
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-4);
    font-weight: bold;
  }

  :deep(a) {
    color: #1266f1;

    :hover {
      opacity: 0.5;
    }
  }

  :deep(ul),
  :deep(ol) {
    padding-left: 1.5em;
    margin: 1rem 0;
    line-height: 1.7;

    li {
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }

  :deep(ul) {
    list-style-type: disc;
  }

  :deep(ol) {
    list-style-type: decimal;
  }
}

@media (max-width: 1024px) {
  .md:deep(img) {
    max-width: 100%;
  }
}
</style>
