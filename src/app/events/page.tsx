'use client'

import { useEffect, useState } from 'react'

import { ListTodo, PlusCircle } from 'lucide-react'

import { useBoundStore } from '@/store/useBoundStore'

import Button from '@/components/Button'
import TextInput from '@/components/TextInput'

import Calendar from './components/Calendar'
import CreateEventModal from './components/CreateEventModal'

export default function Events() {
  const [filterTerm, setFilterTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { events, load } = useBoundStore((state) => {
    return { events: state.events, load: state.load, add: state.add }
  })

  const filteredEvents = events.filter(
    (event) =>
      event.title?.toLocaleLowerCase().includes(filterTerm.toLocaleLowerCase()),
  )

  useEffect(() => {
    load()
  }, [load])

  function handleShowModal() {
    setIsModalOpen(true)
  }

  function handleSetFilterTerm(term: string) {
    setFilterTerm(term)
  }

  return (
    <main className="flex flex-col px-4 py-8">
      <h1 className="mb-8 text-center text-2xl font-bold">Events</h1>
      <div className="flex gap-4">
        <div className="flex-1">
          <TextInput
            type="text"
            placeholder="Search your events by title"
            value={filterTerm}
            onChange={(e) => handleSetFilterTerm(e.target.value)}
          />
        </div>

        <Button
          type="button"
          aria-label="Create a new task"
          className="pr-3"
          onClick={handleShowModal}
        >
          <PlusCircle size={14} />
          Create a new task
        </Button>
      </div>

      <section className="mt-6 h-full">
        {events.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <ListTodo size={48} />
            <h2 className="text-center">
              {"You don't have any tasks yet. So let's create your first!"}
            </h2>

            <Button
              aria-label="Create"
              onClick={handleShowModal}
              className="pr-3"
            >
              <PlusCircle size={14} />
              Create
            </Button>
          </div>
        ) : (
          <Calendar events={filteredEvents} />
        )}
      </section>

      <CreateEventModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </main>
  )
}
