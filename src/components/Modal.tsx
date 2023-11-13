import * as Dialog from '@radix-ui/react-dialog'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  title?: string
  setOpen: (open: boolean) => void
  children: React.ReactNode
}

export default function Modal(props: ModalProps) {
  function handleCloseModal() {
    props.setOpen(false)
  }

  return (
    <Dialog.Root open={props.open}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-20 bg-zinc-700/50"
          onClick={handleCloseModal}
        />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-30 flex w-full max-w-md translate-x-[-50%] translate-y-[-50%] flex-col gap-4 rounded-lg bg-zinc-800 p-4">
          <motion.div
            initial={{ translateY: 50, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
          >
            {props.title && (
              <Dialog.Title className="text-lg font-bold">
                {props.title}
              </Dialog.Title>
            )}
            {props.children}

            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-2 top-2 flex items-center justify-center rounded-full bg-transparent p-2 text-zinc-100 transition-colors hover:bg-zinc-100/10"
                onClick={handleCloseModal}
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
