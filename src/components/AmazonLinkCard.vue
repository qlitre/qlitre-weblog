<script setup lang="ts">
import type { AmazonLink } from '../types/blog'

type Props = {
  amazonLink: AmazonLink
}

const { amazonLink } = defineProps<Props>()
</script>

<template>
  <div class="link-box">
    <div class="left">
      <a class="title" :href="amazonLink.url" target="_blank">
        {{ amazonLink.title }}
      </a>
      <a class="link" :href="amazonLink.url" target="_blank"> Amazon で購入する </a>
    </div>
    <div class="right">
      <img class="img" :src="amazonLink.image.url" :alt="amazonLink.title" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.link-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4) var(--spacing-5);
  border: var(--border-1);
  border-color: var(--c-teal-400);
  border-radius: var(--radius-xl);
  margin: var(--spacing-5) 0;
}

.left {
  padding-right: var(--spacing-4);
}

.title {
  font-size: var(--font-size-base);
  line-height: 1.8;
  font-weight: bold;
  margin-bottom: var(--spacing-4);
  color: var(--c-gray-500);
  display: block;

  &:hover {
    opacity: 0.5;
  }
}

.link {
  color: var(--c-teal-400);
  font-size: var(--font-size-base);
  font-weight: 500;

  &:hover {
    opacity: 0.5;
  }
}

.img {
  max-height: 150px;
  width: auto;
}
</style>
