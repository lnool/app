<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <strong class="title">{{ title }}</strong>
        <div class="handler">
          <slot name="header-hanlder" />
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="slectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="60"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="80"
        label="序号"
        align="center"
      ></el-table-column>
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  listData: {
    type: Array,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  propList: {
    type: Array,
    required: true
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 })
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['slectionChange', 'update:page'])
const slectionChange = (value: any): void => emit('slectionChange', value)
const handleCurrentChange = (currentPage: number): void =>
  emit('update:page', { ...props.page, currentPage })
const handleSizeChange = (pageSize: number): void =>
  emit('update:page', { ...props.page, pageSize })
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 50px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}
</style>
