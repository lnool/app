<template>
  <div class="role">
    <page-search :searchConfig="searchConfig" />
    <page-content :contentConfig="contentConfig" pageName="role"></page-content>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import { searchConfig, contentConfig } from './config'
</script>

<style scoped></style>
