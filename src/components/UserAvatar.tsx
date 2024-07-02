"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'

export default function UserAvatar({ session }: any) {
  
  // if (!session?.user?.image) return null

  return (
    <div>
      <Avatar>
        <AvatarImage src={session.user.image!} alt={session.user.name!} />
        <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </div>
  )
}