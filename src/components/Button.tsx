import { twMerge } from 'tailwind-merge'

type ButtonProps = React.ComponentProps<'button'>

export default function Button(props: ButtonProps) {
  const tailwindClasses = twMerge(
    'flex items-center gap-2 rounded-lg bg-emerald-600 px-2 py-1.5 text-sm leading-6 text-zinc-100 hover:bg-emerald-700 transition-colors',
    props.className,
  )

  return <button {...props} className={tailwindClasses} />
}
