import { Event } from '@/@types/event'
import { Holiday } from '@/@types/holiday'
import { api, holidayApi } from '@/lib/axios'
import { StateCreator } from 'zustand'

export interface EventSliceProps {
  events: Event[]
  getEvent: (id: string) => Promise<Event | null>
  load: () => Promise<void>
  add: (data: Event) => Promise<void>
  update: (id: string, data: Event) => Promise<boolean>
  remove: (id: string) => Promise<boolean>
}

export const createEventSlice: StateCreator<EventSliceProps> = (set) => ({
  events: [],

  getEvent: async (eventId) => {
    const res = await api.get(`/events/${eventId}`).catch(() => {
      return null
    })

    if (!res) return null

    const event: Event = res.data.event

    return event
  },

  add: async (data) => {
    const res = await api.post('/events', data)

    if (res.status !== 201) {
      return
    }

    const { id, title, description, start, end }: Event = res.data

    const newEvent = {
      id,
      title,
      description,
      start,
      end,
    }

    set((state) => ({
      events: [...state.events, newEvent],
    }))
  },

  load: async () => {
    try {
      const events = await fetchEvents()
      const holidayEvents = await fetchHolidayEvents()

      const combinedEvents = [...events, ...holidayEvents]

      set({
        events: combinedEvents,
      })
    } catch (error) {
      console.error('Error:', error)
    }
  },

  update: async (id, data) => {
    const updatedEvent = {
      ...data,
      start: new Date(data.start),
      end: new Date(data.end),
    }

    const res = await api.put(`/events/${id}`, updatedEvent)

    if (res.status !== 200) return false

    set((state) => {
      const events = state.events
      const eventIndex = events.findIndex((event) => event.id === id)

      if (eventIndex === -1) return state

      events[eventIndex] = updatedEvent

      return {
        events,
      }
    })

    return true
  },

  remove: async (id) => {
    const res = await api.delete(`/events/${id}`)

    if (res.status !== 200) return false

    set((state) => {
      const events = state.events
      const eventIndex = events.findIndex((event) => event.id === id)

      if (eventIndex === -1) return state

      events.splice(eventIndex, 1)

      return {
        events,
      }
    })

    return true
  },
})

async function fetchEvents() {
  const res = await api.get('/events')

  if (res.status !== 200) {
    return []
  }

  return res.data.events as Event[]
}

async function fetchHolidayEvents() {
  const holidaysRes = await holidayApi.get('/2023')

  if (holidaysRes.status === 200) {
    const holidays: Holiday[] = holidaysRes.data

    return holidays.map((holiday) => ({
      title: holiday.name,
      description: 'Feriado nacional',
      start: new Date(`${holiday.date}T00:00:00`),
      end: new Date(`${holiday.date}T00:00:00`),
      type: 'holiday',
    })) as Event[]
  }

  return []
}
