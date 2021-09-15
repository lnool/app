<template>
  <div class="user">
    <page-search :searchConfig="config" />
    <div class="user-container">
      <l-table :listData="userList" :propList="propList">
        <template #enable="scope">
          <el-button plain size="mini" :type="scope.row ? 'success' : 'danger'">
            {{ scope.row ? '启用' : '禁用' }}</el-button
          >
        </template>
        <template #createAt="scope">{{ scope.row }} </template>
        <template #updateAt="scope">{{ scope.row }} </template>
      </l-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import LTable from '@/base-ui/table'
import PageSearch from '@/components/page-search/page-search.vue'
import { config } from './config'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'user',
  components: { PageSearch, LTable },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      url: '/users/list',
      data: { offset: 0, size: 10 }
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minwidth: '100' },
      { prop: 'realname', label: '真实姓名', minwidth: '100' },
      { prop: 'cellphone', label: '手机号', minwidth: '120' },
      { prop: 'enable', label: '状态', minwidth: '100' },
      { prop: 'createAt', label: '创建时间', minwidth: '250' },
      { prop: 'updateAt', label: '更新时间', minwidth: '250' }
    ]
    console.log(userList.value)

    return {
      config,
      userList,
      propList,
      userCount
    }
  }
})
</script>

<style scoped>
.user-container {
  border-top: 25px solid #f0f2f5;
  padding: 20px;
}
</style>
