<template>
  <div class="menu">
    <page-content :contentConfig="contentConfig" pageName="menu" />
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config'
</script>

<style scoped></style>
