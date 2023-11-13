export type Event = {
  id?: string
  title: string
  description: string
  start: Date
  end: Date
  allDay?: boolean
  type?: 'holiday' | 'task'
  tags?: string[]
}
