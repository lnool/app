<template>
  <div class="page-modal">
    <el-dialog
      title="新建用户"
      v-model="dialogVisible"
      width="30%"
      destroy-on-close
      center
    >
      <l-form v-bind="modalConfig" v-model="formData"></l-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlerConfirmClick">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineExpose } from 'vue'
import { useStore } from 'vuex'
import LForm from '@/base-ui/form'

const props = defineProps(['modalConfig', 'defaultInfo', 'pageName'])

let dialogVisible = ref(false)
let formData = ref<any>({})

const store = useStore()

watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[item.field] = newValue[item.field]
    }
  }
)
// 点击确定按钮
const handlerConfirmClick = () => {
  dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    //  编辑
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      data: { ...formData.value },
      id: props.defaultInfo.id
    })
  } else {
    // 新建
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      data: { ...formData.value }
    })
  }
}
defineExpose({ dialogVisible })
</script>

<style lang="less" scoped></style>
