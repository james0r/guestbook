import React from 'react'
import getJoke from '../../actions/getJoke'
import SomeClientComponent from '@/components/SomeClientComponent'
import SomeServerComponent from '@/components/SomeServerComponent'

const Joke = async () => {
  const data = await getJoke();

  if (!data.success) {
    throw new Error(data.error)
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <div>{data.joke}</div>
      <SomeClientComponent>
        <SomeServerComponent />
      </SomeClientComponent>
    </div>
  )
}

export default Joke