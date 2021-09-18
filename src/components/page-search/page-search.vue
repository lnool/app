<template>
  <div>
    <l-form class="l-form" v-bind="searchConfig" v-model="formData">
      <template #header>
        <h3 class="cm-header">高级检索</h3>
      </template>
      <template #footer>
        <div class="l-header">
          <el-button
            icon="el-icon-refresh-left"
            size="small"
            @click="resetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="handleQueryClick"
          >
            搜索
          </el-button>
        </div>
      </template>
    </l-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import LForm from '@/base-ui/form'
const props = defineProps(['searchConfig'])
const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])
const formItems = props.searchConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

const resetClick = () => {
  formData.value = formOriginData
  emit('resetBtnClick')
}
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}
</script>

<style lang="less" scoped>
.l-header {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
