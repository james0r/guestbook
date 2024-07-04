"use client"

import React from 'react'
import SomeServerComponent from './SomeServerComponent'


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