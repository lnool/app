<template>
  <div class="form">
    <div class="form-header">
      <slot name="header" />
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
              size="small"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  size="small"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="form-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType } from 'vue'
import { IFormItem } from './interface'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => []
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: '10px' })
  },
  colLayout: {
    type: Object,
    default: () => ({
      span: 6,
      xl: 6,
      lg: 8,
      md: 8,
      sm: 12,
      xs: 24
    })
  }
})
const emit = defineEmits(['update:modelValue'])

const handleValueChange = (value: any, field: string) =>
  emit('update:modelValue', { ...props.modelValue, [field]: value })
</script>

<style scoped lang="less">
.form {
  padding-top: 22px;
}
</style>
