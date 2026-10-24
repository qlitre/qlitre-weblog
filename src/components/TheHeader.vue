<script setup lang="ts">
import { config } from '../settings/siteSettings'
</script>

<template>
  <header class="sticky top-0 backdrop-blur-sm">
    <div class="mx-auto flex max-w-content items-center justify-between p-4">
      <nuxt-link :to="`/`">
        <h1 class="text-xl font-bold tracking-[1px] text-black">
          {{ config.siteName }}
        </h1>
      </nuxt-link>
      <nav class="flex list-none items-center">
        <li class="mr-6 text-base font-bold tracking-[1px]">
          <a
            class="text-black hover:opacity-60"
            :href="config.social.repos"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
        <li class="mr-6 text-base font-bold tracking-[1px]">
          <nuxt-link
            class="text-black hover:opacity-60"
            to="https://qlitre.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ABOUT
          </nuxt-link>
        </li>
      </nav>
    </div>
  </header>
</template>
