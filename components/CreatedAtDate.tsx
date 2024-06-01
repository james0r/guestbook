"use client"

import React, { useEffect, useState } from 'react'

interface Props {
  timestamp: string
}

const CreatedAtDate = ({ timestamp }: Props) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    const date = new Date(timestamp)
    const localTime = date.toLocaleString()
    setDate(localTime);
  }, [timestamp]);

  return (
    <>
      {date}
    </>
  )
}

export default CreatedAtDate