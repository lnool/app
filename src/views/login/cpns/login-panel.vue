<template>
  <div class="login-panel">
    <div class="login-title">后台管理系统</div>
    <transition name="el-fade-in-linear">
      <el-tabs>
        <el-tab-pane>
          <template #label>
            <span>账户登录</span>
          </template>
          <login-account ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <span>手机登录登录</span>
          </template>
          <login-phone />
        </el-tab-pane>
      </el-tabs>
    </transition>
    <div class="account-control">
      <el-checkbox v-model="isRemember">记住密码</el-checkbox>
      <el-link>忘记密码</el-link>
    </div>
    <el-button class="login-btn" @click="loginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 记住密码
    const isRemember = ref(true)

    const accountRef = ref()

    // 登录
    const loginClick = () => {
      accountRef.value?.accountLogin()
    }

    return {
      isRemember,
      loginClick,
      accountRef
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  padding: 0 60px 20px 60px;
  box-shadow: 0 8px 8px rgba(10, 16, 20, 0.24), 0 0 8px rgba(10, 16, 20, 0.12);
  .login-title {
    text-align: center;
    color: #95b0b7;
    font-size: 22px;
    line-height: 70px;
  }
  .account-control {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    background: #00a1ba;
    color: white;
  }
}
</style>
