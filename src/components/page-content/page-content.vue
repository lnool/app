<template>
  <div class="page-content">
    <l-table :listData="list" v-bind="contentConfig">
      <template #header-hanlder>
        <el-button size="medium" type="primary">新增用户</el-button>
      </template>

      <template #enable="scope">
        <el-button plain size="mini" :type="scope.row ? 'success' : 'danger'">
          {{ scope.row ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope"
        >{{ $filters.formatTime(scope.row) }}
      </template>
      <template #updateAt="scope"
        >{{ $filters.formatTime(scope.row) }}
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-button icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="mini" type="text"
            >删除</el-button
          >
        </div>
      </template>
    </l-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineExpose, defineProps } from 'vue'
import { useStore } from 'vuex'
import LTable from '@/base-ui/table'

const props = defineProps(['contentConfig', 'pageName'])
const store = useStore()

const getPageData = (queryInfo?: any) => {
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    data: { offset: 0, size: 10, ...queryInfo }
  })
}
getPageData()
//暴露
defineExpose({ getPageData })

const list = computed(() => store.getters[`system/getList`](props.pageName))
// const usersCount = computed(() => store.state.system.usersCount)
</script>

<style lang="less" scoped>
.page-content {
  border-top: 25px solid #f0f2f5;
  padding: 20px;
}
</style>
