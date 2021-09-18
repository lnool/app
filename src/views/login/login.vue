<template>
  <div class="login">
    <login-panel></login-panel>
    <div class="copy">
      <el-link type="primary" href="https://webify.cloudbase.net/"
        >CloudBase Webify.</el-link
      >
      提供网站托管服务
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from './cpns/login-panel.vue'
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg') repeat;
}
.copy {
  position: fixed;
  bottom: 30px;
}
</style>
