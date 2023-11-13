type CardProps = React.ComponentProps<'div'>

export default function Card(props: CardProps) {
  return <div {...props} className="rounded-lg bg-zinc-900 px-2 py-1.5" />
}
