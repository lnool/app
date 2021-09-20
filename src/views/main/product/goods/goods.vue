<template>
  <div class="goods">
    <page-content :contentConfig="contentConfig" page-name="goods">
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        />
      </template>
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content/page-content.vue'
import { contentConfig } from './config'
</script>

<style scoped></style>
