<template>
  <div class="login-account">
    <el-form
      label-width="60px"
      :rules="accountRules"
      :model="account"
      ref="formRef"
      label-position="top"
    >
      <el-form-item label="账号：" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'

import { accountRules } from '@/utils/rules'
import LocalCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: LocalCache.get('name') ?? '',
      password: LocalCache.get('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const accountLogin = (isRemember: boolean) => {
      formRef.value?.validate((isValid: boolean | undefined) => {
        if (!isValid) return
        // 记住密码
        if (isRemember) {
          LocalCache.set('name', account.name)
          LocalCache.set('password', account.password)
        } else {
          LocalCache.delete('name')
          LocalCache.delete('password')
        }
        store.dispatch('login/accountLogin', { ...account })
      })
    }

    return {
      accountRules,
      account,
      formRef,
      accountLogin
    }
  }
})
</script>

<style lang="less" scoped></style>
