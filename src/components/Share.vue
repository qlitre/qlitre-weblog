<script setup lang="ts">
import { config } from '../settings/siteSettings'

type Props = {
  id: string
  title: string
}
const { id, title } = defineProps<Props>()

const twitterLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${config.siteUrl}/${id}/&hashtags=qlitreweblog&via=kuri_tter`
</script>

<template>
  <a class="shareXbtn" :href="twitterLink" target="_blank" rel="noopener noreferrer">
    <img class="xImage" src="../assets/images/xlogo.svg" alt="Twitter" />
    Share
  </a>
</template>

<style scoped lang="scss">
.shareXbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-md);
  color: white;
  background-color: var(--c-blackAlpha-900);
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
  height: var(--size-10);
  transition: background-color 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);

  &:hover {
    background-color: var(--c-blackAlpha-700);
  }
}

.xImage {
  width: 20px;
  height: 20px;
}
</style>
