import Card from '@/components/Card'
import { Bird } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Card>
        <div className="max-w-md p-4">
          <Bird size={44} className="mx-auto mb-4" />
          <h2 className="mb-6 text-center text-xl">
            <span className="font-bold">Welcome!</span>
            <br />
            The objective of this project is to provide a calendar and register
            new events
          </h2>
          <p className="mb-8 text-center">
            I hope you find this project interesting, any suggestions, send an
            email to{' '}
            <span className="text-emerald-600">
              rodrigo.queiroz0629@gmail.com
            </span>
          </p>

          <div className="text-center">
            <Link
              href="/events"
              className="rounded-lg border border-zinc-100/20 px-2 py-1.5 text-center transition-colors hover:text-zinc-100/70"
            >
              Go to events
            </Link>
          </div>
        </div>
      </Card>
    </main>
  )
}
