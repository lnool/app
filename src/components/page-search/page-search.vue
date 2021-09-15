<template>
  <div>
    <l-form class="l-form" v-bind="searchConfig" v-model="formData">
      <template #header>
        <h3 class="cm-header">高级检索</h3>
      </template>
      <template #footer>
        <div class="l-header">
          <el-button icon="el-icon-refresh-left" size="small">重置</el-button>
          <el-button type="primary" icon="el-icon-search" size="small"
            >搜索</el-button
          >
        </div>
      </template>
    </l-form>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
import LForm from '@/base-ui/form'
export default defineComponent({
  components: { LForm },
  props: {
    searchConfig: {
      type: Object,
      required: true
    }
  },
  setup() {
    const formData = reactive({
      id: '',
      password: '',
      name: '',
      sport: '',
      createTime: ''
    })
    return {
      formData
    }
  }
})
</script>

<style lang="less" scoped>
.l-header {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
