import { ref } from 'vue'
import PageModal from '@/components/page-modal/page-modal.vue'

type CallbackFn = (...args: any[]) => void

export const usePageModal = (
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
): any[] => {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handlerEditClick = (item: any): void => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true
    editCallback && editCallback()
  }
  const handlerNewClick = (): void => {
    defaultInfo.value = {}
    if (pageModalRef.value) pageModalRef.value.dialogVisible = true
    newCallback && newCallback()
  }
  return [defaultInfo, pageModalRef, handlerEditClick, handlerNewClick]
}
