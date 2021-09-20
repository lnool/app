<template>
  <div class="user">
    <page-search
      :searchConfig="searchConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    />
    <page-content
      ref="pageContentRef"
      pageName="users"
      :contentConfig="contentConfig"
      @editBtnClick="handlerEditClick"
      @newBtnClick="handlerNewClick"
    />
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    />
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageModal from '@/components/page-modal/page-modal.vue'
import { searchConfig, contentConfig, modalConfig } from './config'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from 'vuex'

//  密码输入框显示隐藏
const newCallback = () =>
  (modalConfig.formItems.find((item) => item.field === 'password')!.isHidden =
    false)

const editCallback = () =>
  (modalConfig.formItems.find((item) => item.field === 'password')!.isHidden =
    true)
// 获取部门和角色的信息
const store = useStore()
store.dispatch('initialData')
const departmentItem = modalConfig.formItems.find(
  (item) => item.field === 'departmentId'
)
const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
departmentItem!.options = store.state.entireDepartment.map((item: any) => ({
  title: item.name,
  value: item.id
}))
roleItem!.options = store.state.entireRole.map((item: any) => ({
  title: item.name,
  value: item.id
}))

const [pageContentRef, resetBtnClick, queryBtnClick] = usePageSearch()
const [defaultInfo, pageModalRef, handlerEditClick, handlerNewClick] =
  usePageModal(newCallback, editCallback)
</script>

<style scoped></style>
