<template>
  <div class="page-content">
    <l-table
      :listData="list"
      :count="count"
      v-bind="contentConfig"
      v-model:page="pageInfo"
    >
      <template #header-hanlder>
        <el-button
          v-if="isCreate"
          size="medium"
          type="primary"
          @click="handlerNewClick"
        >
          新增用户
        </el-button>
      </template>

      <template #status="scope">
        <el-button plain size="mini" :type="scope.row ? 'success' : 'danger'">
          {{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handlerEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="idDelete"
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDelClick(scope.row)"
          >
            删除
          </el-button>
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
import {
  computed,
  defineExpose,
  defineProps,
  defineEmits,
  ref,
  watch
} from 'vue'
import { useStore } from 'vuex'
import { usePermission } from '@/hooks/usePermission'
import LTable from '@/base-ui/table'
const emit = defineEmits(['newBtnClick', 'editBtnClick'])
const props = defineProps(['contentConfig', 'pageName'])
const store = useStore()

const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const idDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

// 双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 })

watch(pageInfo, () => getPageData())

// 查询数据
const getPageData = (queryInfo?: any) => {
  if (!isQuery) return
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    data: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo
    }
  })
}
// 删除
const handleDelClick = (item: any) => {
  console.log(item)
  store.dispatch('system/delPageDataAction', {
    pageName: props.pageName,
    id: item.id
  })
}
// 新增
const handlerNewClick = (): void => emit('newBtnClick')
// 编辑
const handlerEditClick = (item: any): void => emit('editBtnClick', item)
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
