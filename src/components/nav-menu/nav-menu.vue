<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" />
      <span v-show="!collapse" class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      unique-opened
      :collapse="collapse"
      background=""
    >
      <template v-for="item in menu" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <i v-if="item.icon" :class="[item.icon]"></i>
              <span>{{ item.name }}</span>
            </template>
            <!-- 遍历里边的Item -->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="routeLink(subItem.url)"
              >
                <i v-if="subItem.icon" :class="[subItem.icon]"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <i v-if="item.icon" :class="[item.icon]"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { findRoute } from '@/router/config'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const menu = computed(() => store.state.login.menu)

    const router = useRouter()
    const route = useRoute()

    const currentPath = route.path
    const m = findRoute(menu.value, currentPath)
    const defaultValue = ref(m.id + '')

    const routeLink = (url: string) => {
      router.push({
        path: url ?? '404'
      })
    }

    return {
      menu,
      defaultValue,
      routeLink
    }
  }
})
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background: #00a1ba08;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: #333;
    }
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
  border-right: none;
}
</style>
