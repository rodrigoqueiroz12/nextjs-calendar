import './CreateEventModal.css'

import { Dispatch, SetStateAction } from 'react'
import CreatableSelect from 'react-select/creatable'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useBoundStore } from '@/store/useBoundStore'

import { Event } from '@/@types/event'
import Fieldset from '@/components/Fieldset'
import Label from '@/components/Label'
import Modal from '@/components/Modal'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'

interface CreateEventModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function CreateEventModal({
  isModalOpen,
  setIsModalOpen,
}: CreateEventModalProps) {
  const { register, handleSubmit, reset, control } = useForm<Event>()

  const { load, add } = useBoundStore((state) => {
    return { load: state.load, add: state.add }
  })

  const onSubmit: SubmitHandler<Event> = async (data) => {
    return console.log(data)

    const event = {
      ...data,
      start: new Date(data.start),
      end: new Date(data.end),
    }

    await add(event)
    await load()

    setIsModalOpen(false)
    reset()
  }

  return (
    <Modal
      title="Create a new task"
      open={isModalOpen}
      setOpen={setIsModalOpen}
    >
      <form
        id="new-task-form"
        className="mt-4 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fieldset>
          <Label htmlFor="title">Title</Label>
          <TextInput
            type="text"
            id="title"
            {...register('title', { required: true })}
            placeholder="Task title"
          />
        </Fieldset>

        <Fieldset>
          <Label htmlFor="description">Description</Label>
          <TextInput
            type="text"
            id="description"
            placeholder="Task description"
            {...register('description', { required: true })}
          />
        </Fieldset>

        <div className="flex flex-wrap gap-4">
          <Fieldset className="flex-1">
            <Label htmlFor="start">Stars at</Label>
            <TextInput
              type="datetime-local"
              id="start"
              {...register('start', { required: true })}
            />
          </Fieldset>

          <Fieldset className="flex-1">
            <Label htmlFor="end">Ends at</Label>
            <TextInput
              type="datetime-local"
              id="end"
              {...register('end', { required: true })}
            />
          </Fieldset>
        </div>

        <Fieldset>
          <Label htmlFor="tags">Add some tags</Label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                className="select"
                classNamePrefix="react-select"
                isMulti
                options={[
                  { value: 'chocolate', label: 'Chocolate' },
                  { value: 'strawberry', label: 'Strawberry' },
                  { value: 'vanilla', label: 'Vanilla' },
                ]}
                onChange={field.onChange}
              />
            )}
          />
        </Fieldset>
      </form>

      <Button
        form="new-task-form"
        type="submit"
        className="ml-auto mt-4"
        aria-label="Create"
      >
        Create
      </Button>
    </Modal>
  )
}
