<template>
  <div class="page-content">
    <l-table
      :listData="list"
      :count="count"
      v-bind="contentConfig"
      v-model:page="pageInfo"
    >
      <template #header-hanlder>
        <el-button v-if="isCreate" size="medium" type="primary"
          >新增用户</el-button
        >
      </template>

      <template #status="scope">
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
          <el-button v-if="isUpdate" icon="el-icon-edit" size="mini" type="text"
            >编辑</el-button
          >
          <el-button
            v-if="idDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插槽 -->
      <template
        v-for="item in otherPropsSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row" />
        </template>
      </template>
    </l-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineExpose, defineProps, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { usePermission } from '@/hooks/usePermission'
import LTable from '@/base-ui/table'

const props = defineProps(['contentConfig', 'pageName'])
const store = useStore()

const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const idDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

// 双向绑定pageInfo
const pageInfo = ref({ currentPage: 0, pageSize: 10 })

watch(pageInfo, () => getPageData())

const getPageData = (queryInfo?: any) => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    data: {
      offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
getPageData()
//暴露
defineExpose({ getPageData })

const list = computed(() => store.getters[`system/getList`](props.pageName))
const count = computed(() => store.getters[`system/getCount`](props.pageName))

// 获取其他动态插槽的名称
const otherPropsSlots = props.contentConfig.propList.filter((item: any) => {
  if (item.slotName === 'status') return false
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})
</script>

<style lang="less" scoped>
.page-content {
  border-top: 25px solid #f0f2f5;
  padding: 20px;
}
</style>
