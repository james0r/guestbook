"use client"

import React from 'react'
import UserAvatar from '@/components/auth/user-avatar'
import { signOut } from "next-auth/react"
import { cn } from '@/lib/utils'
import { useSession } from "next-auth/react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const HeaderDropdown = () => {
  const { data: session, status } = useSession()

  console.log(session, status)

  return (
    <>
      {
        status === 'authenticated' && (
          <Popover>
            <PopoverTrigger>
              <UserAvatar session={session} />
            </PopoverTrigger>
            <PopoverContent
              sideOffset={8}
              align="end"
              alignOffset={0}
              className={cn([
                'bg-white'
              ])}
            >
              <ul className="flex flex-col gap-2">
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