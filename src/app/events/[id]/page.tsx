'use client'

import { motion } from 'framer-motion'

import { Event } from '@/@types/event'
import Card from '@/components/Card'
import Fieldset from '@/components/Fieldset'
import Label from '@/components/Label'
import TextInput from '@/components/TextInput'
import { useBoundStore } from '@/store/useBoundStore'
import { ChevronLeft, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Modal from '@/components/Modal'
import Button from '@/components/Button'

import { formatDateTime } from '@/utils/format_date_time'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'

type Inputs = {
  title: string
  description: string
  start: Date
  end: Date
}

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const [isUpdating, setIsUpdating] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { register, handleSubmit } = useForm<Inputs>()
  const router = useRouter()
  const { getEvent, remove, update } = useBoundStore((state) => {
    return {
      getEvent: state.getEvent,
      remove: state.remove,
      update: state.update,
    }
  })

  const [event, setEvent] = useState<Event | null>(null)

  async function fetchEvent() {
    const event = await getEvent(id)

    if (!event) {
      return router.push('/events')
    }

    setEvent(event)
  }

  async function handleDeleteEvent() {
    if (!event) return

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await remove(event.id!)

    return router.push('/events')
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsUpdating(true)

    if (!event) return

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await update(event.id!, { ...data, id: event.id })

    setTimeout(() => {
      setIsUpdating(false)
    }, 2000)
  }

  useEffect(() => {
    fetchEvent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="flex h-screen items-center justify-center px-4">
      {event ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/events"
            className="mb-4 inline-flex items-center gap-2 transition-colors hover:text-zinc-200"
          >
            <ChevronLeft size={18} />
            Back
          </Link>
          <Card>
            <div className="flex w-full max-w-md flex-col items-start justify-center gap-4 p-2">
              <form
                id="update-event-form"
                className="w-full space-y-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Fieldset>
                  <Label htmlFor="title">Title</Label>
                  <TextInput
                    defaultValue={event.title}
                    type="text"
                    id="title"
                    placeholder="Task title"
                    className="border-2 border-zinc-700"
                    {...register('title')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label htmlFor="description">Description</Label>
                  <TextInput
                    defaultValue={event.description}
                    type="text"
                    id="description"
                    placeholder="Task description"
                    className="border-2 border-zinc-700"
                    {...register('description')}
                  />
                </Fieldset>

                <div className="flex flex-wrap gap-4">
                  <Fieldset className="flex-1">
                    <Label htmlFor="start">Stars at</Label>
                    <TextInput
                      defaultValue={formatDateTime(new Date(event.start))}
                      type="datetime-local"
                      id="start"
                      className="border-2 border-zinc-700"
                      {...register('start')}
                    />
                  </Fieldset>

                  <Fieldset className="flex-1">
                    <Label htmlFor="end">Ends at</Label>
                    <TextInput
                      defaultValue={formatDateTime(new Date(event.end))}
                      type="datetime-local"
                      id="end"
                      className="border-2 border-zinc-700"
                      {...register('end')}
                    />
                  </Fieldset>
                </div>
              </form>

              <div className="flex w-full justify-end gap-2">
                <Button
                  form="update-event-form"
                  type="submit"
                  title="Delete task"
                >
                  {isUpdating ? <span>Updating...</span> : <span>Update</span>}
                </Button>

                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-red-600 hover:bg-red-700"
                  title="Delete task"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <Loader className="my-4 animate-spin" />
      )}

      <Modal title="Delete event?" open={isModalOpen} setOpen={setIsModalOpen}>
        <div className="flex flex-col gap-4">
          <p>
            Are you sure you want to delete this event? This action is
            irreversible
          </p>
          <div className="flex w-full justify-end gap-2 ">
            <Button
              className="bg-zinc-400/20 hover:bg-zinc-400/10"
              title="Delete task"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteEvent}
              className="bg-red-600 hover:bg-red-700"
              title="Delete task"
            >
              {"Yes, I'm sure!"}
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
