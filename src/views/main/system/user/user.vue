<template>
  <div class="user">
    <page-search
      :searchConfig="searchConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      :contentConfig="contentConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import { searchConfig, contentConfig } from './config'
import { usePageSearch } from '@/hooks/usePageSearch'
const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch()
</script>

<style scoped></style>
