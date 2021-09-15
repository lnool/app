<template>
  <div class="login-phone">
    <el-form
      ref="formRef"
      label-width="60px"
      :rules="phoneRules"
      :model="phone"
      label-position="top"
    >
      <el-form-item label="手机号：" prop="num">
        <el-input v-model="phone.num" />
      </el-form-item>
      <el-form-item label="验证码：" prop="code">
        <div class="login-phone-code">
          <el-input v-model="phone.code" />
          <el-link :underline="false" class="login-phone-code-link"
            >获取验证码</el-link
          >
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent } from 'vue'

import { useStore } from 'vuex'

import { phoneRules } from '@/utils/rules'
import { ElForm } from 'element-plus'
export default defineComponent({
  setup() {
    const store = useStore()

    const phone = reactive({
      num: '',
      code: ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()

    const phoneLogin = () => {
      formRef.value?.validate((isValid: boolean | undefined) => {
        if (!isValid) return
        store.dispatch('phoneLogin', { ...phone })
      })
    }

    return {
      phone,
      formRef,
      phoneRules,
      phoneLogin
    }
  }
})
</script>

<style lang="less" scoped>
.login-phone-code {
  display: flex;
  .login-phone-code-link {
    width: 120px;
    margin-left: 20px;
  }
}
</style>
