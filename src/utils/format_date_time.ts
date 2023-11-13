import { format } from 'date-fns'

export function formatDateTime(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm")
}
