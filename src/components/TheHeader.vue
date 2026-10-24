<script setup lang="ts">
import { config } from '../settings/siteSettings'
</script>

<template>
  <header class="root">
    <div class="header">
      <nuxt-link :to="`/`">
        <h1 class="site-title">
          {{ config.siteName }}
        </h1>
      </nuxt-link>
      <nav class="main-nav">
        <li class="nav-item">
          <a :href="config.social.repos" target="_blank" rel="noopener noreferrer"> GitHub </a>
        </li>
        <li class="nav-item">
          <nuxt-link to="https://qlitre.me/" target="_blank" rel="noopener noreferrer">
            ABOUT
          </nuxt-link>
        </li>
      </nav>
    </div>
  </header>
</template>

<style scoped lang="scss">
.root {
  position: sticky;
  top: 0;
  backdrop-filter: blur(8px);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--spacing-4);
  padding-bottom: var(--spacing-4);
  max-width: var(--container-max-width);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-4);
  padding-right: var(--spacing-4);
}

.site-title {
  font-size: var(--font-size-xl);
  color: var(--c-black);
  letter-spacing: 1px;
}

.main-nav {
  list-style: none;
  margin: 0;
  display: flex;
  align-items: center;

  .nav-item {
    margin-right: 1.5rem;
    font-size: var(--font-size-base);
    font-weight: bold;
    letter-spacing: 1px;
  }

  a {
    color: var(--c-black);

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
