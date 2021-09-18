import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const formatUtcString = (
  utcString: string,
  format: string = DATE_TIME_FORMAT
): any => {
  return dayjs.utc(utcString).format(format)
}
