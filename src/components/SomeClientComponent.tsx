"use client"

import React from 'react'

const SomeClientComponent = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <>
      <div>
        SomeClientComponent
        {children}
      </div>
    </>
  )
}

export default SomeClientComponent