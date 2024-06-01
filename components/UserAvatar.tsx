"use client"

import Image from 'next/image'

export default function UserAvatar({ session }: any) {

  if (!session?.user) return null

  return (
    <div>
      <Image
        src={session?.user?.image}
        width={40}
        height={40}
        alt={session?.user?.name}
        className="rounded-full"
      />
    </div>
  )
}