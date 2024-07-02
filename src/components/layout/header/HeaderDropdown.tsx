"use client"

import React from 'react'
import { signOut } from "next-auth/react"
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import Link from 'next/link'

const HeaderDropdown = ({ user }: any) => {

  return (
    <>
      {
        user && (
          <Popover>
            <PopoverTrigger>
              <Avatar className="text-black">
                <AvatarImage src={user?.image!} alt={user?.name!} />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              sideOffset={8}
              align="end"
              alignOffset={0}
              className={cn([
                'bg-white'
              ])}
            >
              <ul className="flex flex-col gap-2 space-y-2">
                <li>
                  <Link href="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={() => signOut()}>Sign out</button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        )
      }
    </>
  )
}

export default HeaderDropdown