import { ComponentProps, Ref, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = ComponentProps<'input'>

function Input(props: InputProps, ref: Ref<HTMLInputElement>) {
  const tailwindClasses = twMerge(
    'w-full rounded-lg bg-zinc-900 px-2 py-1.5 text-sm leading-6 placeholder:text-zinc-300/50',
    props.className,
  )

  return <input {...props} className={tailwindClasses} ref={ref} />
}

const TextInput = forwardRef(Input)

export default TextInput
