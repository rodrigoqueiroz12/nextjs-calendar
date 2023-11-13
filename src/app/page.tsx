import Card from '@/components/Card'

export default function Home() {
  return (
    <main className="flex h-screen items-center justify-center">
      <Card>
        <form className="flex w-form max-w-sm flex-col gap-4 p-4">
          <div className="flex flex-1 flex-col items-center gap-3">
            <label
              htmlFor="email"
              className="text-md text-center font-bold sm:text-xl"
            >
              {"Welcome! Let's find your account!"}
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              required
              autoComplete="off"
              className="w-full rounded-lg bg-zinc-800 px-2 py-1.5 text-center text-sm leading-6 placeholder:text-zinc-300/50"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-2 py-1.5 text-sm leading-6 text-zinc-50 transition-colors hover:bg-emerald-700"
          >
            {'Sign In'}
          </button>
        </form>
      </Card>
    </main>
  )
}
