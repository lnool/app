<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="folfClick"
    ></i>
    <div class="container">
      <l-breadcrumb :breadcrumbs="breadcrumbs" />
      <div>userInfo</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import LBreadcrumb from '@/base-ui/breadcrumb'
import { getBreadcrumbs } from '@/router/config'
export default defineComponent({
  components: { LBreadcrumb },
  emits: ['collapseClick'],
  setup(props, { emit }) {
    const isFold = ref(false)

    const store = useStore()
    const route = useRoute()

    // 面包屑数据
    const breadcrumbs = computed(() => {
      const menu = store.state.login.menu
      const currentPath = route.path
      return getBreadcrumbs(menu, currentPath)
    })

    window.addEventListener('resize', () => {
      isFold.value = document.body.clientWidth < 768
      emit('collapseClick', isFold.value)
    })

    const folfClick = () => {
      isFold.value = !isFold.value
      emit('collapseClick', isFold.value)
    }

    return {
      isFold,
      breadcrumbs,
      folfClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 20px;
    cursor: pointer;
  }
  .container {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }
}
</style>
