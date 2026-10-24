<script setup lang="ts">
import type { AmazonLink } from '../types/blog'

type Props = {
  amazonLink: AmazonLink
}

const { amazonLink } = defineProps<Props>()
</script>

<template>
  <div
    class="my-5 flex w-full items-center justify-between rounded-[10px] border border-teal-400 px-5 py-4"
  >
    <div class="pr-4">
      <a
        class="mb-4 block text-base leading-[1.8] font-bold text-gray-500 hover:opacity-50"
        :href="amazonLink.url"
        target="_blank"
      >
        {{ amazonLink.title }}
      </a>
      <a
        class="text-base font-medium text-teal-400 hover:opacity-50"
        :href="amazonLink.url"
        target="_blank"
      >
        Amazon で購入する
      </a>
    </div>
    <div>
      <img
        class="inline h-auto max-h-[150px] w-auto max-w-none align-baseline"
        :src="amazonLink.image.url"
        :alt="amazonLink.title"
      />
    </div>
  </div>
</template>
