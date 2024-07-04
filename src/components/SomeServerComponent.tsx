import React from 'react'

const SomeServerComponent = async () => {
  "use server"
  const random = await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000))

  return (
    <div>SomeServerComponent</div>
  )
}

export default SomeServerComponent