<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="rules"
      :model="account"
      ref="formRef"
      label-position="top"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { reactive, ref, defineComponent } from 'vue'
import { rules } from '../config'

export default defineComponent({
  setup() {
    const account = reactive({
      name: '',
      password: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const accountLogin = () => {
      formRef.value?.validate((isValid: boolean | undefined) => {
        console.log(isValid)
      })
    }

    return {
      rules,
      account,
      formRef,
      accountLogin
    }
  }
})
</script>

<style lang="less" scoped></style>
