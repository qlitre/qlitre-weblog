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
  <a
    class="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-black/92 px-4 text-sm text-white transition-colors duration-300 hover:bg-black/64"
    :href="twitterLink"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img class="size-5" src="../assets/images/xlogo.svg" alt="Twitter" />
    Share
  </a>
</template>
