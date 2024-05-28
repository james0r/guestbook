"use client"

import React from 'react'

function formatLocalTime(timestamp: string): string {
  const date = new Date(timestamp)
  const localTime = date.toLocaleString()
  return localTime
}

interface Props {
  timestamp: string
}

const CreatedAtDate = ({ timestamp }: Props) => {

  return (
    <>
      {formatLocalTime(timestamp)}
    </>
  )
}

export default CreatedAtDate