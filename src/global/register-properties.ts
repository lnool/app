import { formatUtcString } from './../utils/date-format'
import { App } from 'vue'

const registerProperties = (app: App): void => {
  app.config.globalProperties.$filters = {
    formatTime(time: string): string {
      return formatUtcString(time)
    }
  }
}

export default registerProperties
