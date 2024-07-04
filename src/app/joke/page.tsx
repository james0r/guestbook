import React from 'react'
import getJoke from '../../actions/getJoke'

const Joke = async () => {
  const data = await getJoke();

  if (!data.success) {
    throw new Error(data.error)
  }

  return (
    <div>
      <h1>Hello, World!</h1>
      <div>{data.joke}</div>
    </div>
  )
}

export default Joke