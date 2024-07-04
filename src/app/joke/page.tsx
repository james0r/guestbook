import React from 'react'
import { getJoke, revalidateJoke } from '../../actions/jokeActions'
import SomeClientComponent from '@/components/SomeClientComponent'
import SomeServerComponent from '@/components/SomeServerComponent'
import { cn } from '@/lib/utils'

const Joke = async () => {
  const data = await getJoke()

  if (!data.success) {
    throw new Error(data.error)
  }

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-y-4 py-12">
      <h1>Hello, World!</h1>
      <div>{data.joke}</div>

      <form action={revalidateJoke}>
        <button className={cn([
          'bg-blue-500',
          'hover:bg-blue-700',
          'text-white',
          'font-bold',
          'py-2',
          'px-4',
          'rounded',
        ])}>
          Revalidate Joke
        </button>
      </form>
      test
      <SomeClientComponent>
        <SomeServerComponent />
      </SomeClientComponent>
    </div>
  )
}

export default Joke