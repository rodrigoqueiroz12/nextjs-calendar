'use client'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

import { useState } from 'react'

import {
  Calendar as BigCalendar,
  View,
  dateFnsLocalizer,
} from 'react-big-calendar'

import { format, parse, startOfWeek, getDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Event } from '@/@types/event'
import Modal from '@/components/Modal'
import { Edit, List, Subtitles } from 'lucide-react'
import Link from 'next/link'

const locales = {
  'pt-BR': ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarProps {
  events: Event[]
}

export default function Calendar(props: CalendarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [view, setView] = useState<View>('month')
  const [date, setDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const events: Event[] = props.events.map((event) => {
    return {
      id: event.id ?? '',
      title: event.title,
      description: event.description,
      start: new Date(event.start),
      end: new Date(event.end),
      allDay:
        new Date(event.start).toISOString() ===
        new Date(event.end).toISOString(),
      type: event.type,
    }
  })

  function handleChangeView(selectedView: View) {
    setView(selectedView)
  }

  function handleNavigate(newDate: Date) {
    setDate(newDate)
  }

  function handleSelectEvent(event: Event) {
    setIsModalOpen(true)
    setSelectedEvent(event)
  }

  return (
    <div className="calendar">
      <BigCalendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        views={['day', 'week', 'month']}
        onView={handleChangeView}
        view={view}
        date={date}
        onNavigate={handleNavigate}
        events={events}
        onSelectEvent={handleSelectEvent}
      />

      {selectedEvent && (
        <Modal open={isModalOpen} setOpen={setIsModalOpen}>
          <div className="pb-6 pt-8">
            <div className="flex items-start gap-4 overflow-hidden">
              <Subtitles size={20} className="min-w-[1.25rem]" />
              <div className="flex flex-col gap-2">
                <h2
                  className="text-lg font-bold leading-5"
                  title={selectedEvent.title}
                >
                  {selectedEvent.title}
                </h2>

                {selectedEvent.allDay ? (
                  <>
                    <p className="text-xs font-thin leading-none">
                      {format(selectedEvent.start, 'eeee, MMMM d')}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-thin leading-none">
                      {format(selectedEvent.start, 'eeee, MMMM d ⋅ h:mm a')}
                    </p>
                    <p className="text-xs font-thin leading-none">
                      {format(selectedEvent.end, 'eeee, MMMM d ⋅ h:mm a')}
                    </p>
                  </>
                )}

                {selectedEvent.type !== 'holiday' && (
                  <p className="my-4">{selectedEvent.description}</p>
                )}
              </div>
            </div>

            {selectedEvent.type === 'holiday' && (
              <div className="mt-6 flex items-center gap-4 overflow-hidden">
                <List size={18} className="min-w-[1.25rem]" />

                <h2
                  className="text-sm font-thin leading-none"
                  title={selectedEvent.title}
                >
                  Holiday
                </h2>
              </div>
            )}
          </div>

          <div className="absolute right-12 top-2 flex justify-end gap-1">
            <Link
              href={`/events/${selectedEvent.id}`}
              className="rounded-full bg-transparent p-2 text-zinc-100 hover:bg-zinc-100/10"
              title="Edit task"
            >
              <Edit size={18} />
            </Link>
          </div>
        </Modal>
      )}
    </div>
  )
}
