<script setup lang="ts">
import type { Body } from '../types/blog'
type Props = {
  repeatedBody: Body[]
}

const { repeatedBody } = defineProps<Props>()
</script>

<template>
  <div v-for="(section, index) in repeatedBody" :key="index">
    <div v-if="section.fieldId == 'amazonLink'">
      <AmazonLinkCard
        :amazon-link="{ title: section.title, url: section.url, image: section.image }"
      />
    </div>
    <div v-if="section.fieldId == 'richEditor'">
      <MarkdownBody :body="section.body" />
    </div>
  </div>
</template>
