import { twMerge } from 'tailwind-merge'

type LabelProps = React.ComponentProps<'label'>

export default function Label(props: LabelProps) {
  const tailwindClasses = twMerge('text-md font-bold', props.className)

  return <label {...props} className={tailwindClasses} />
}
