<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IBreadcrumbs } from './interface'
export default defineComponent({
  props: {
    breadcrumbs: Array as PropType<IBreadcrumbs[]>
  }
})
</script>

<style lang="less" scoped></style>
