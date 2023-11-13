import { twMerge } from 'tailwind-merge'

type FieldsetProps = React.ComponentProps<'fieldset'>

export default function Fieldset(props: FieldsetProps) {
  const tailwindClasses = twMerge(
    'flex flex-col items-start gap-2',
    props.className,
  )

  return <fieldset {...props} className={tailwindClasses} />
}
