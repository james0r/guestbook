"use client"

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { SquarePen, LogIn, Layers } from 'lucide-react'
import { signIn } from "next-auth/react"
import HeaderDropdown from '@/components/layout/header/HeaderDropdown'
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"

const Navigation = () => {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <div className="flex gap-4 items-center">
      <Link href="?modal=info">
        <Button variant="secondary">
          <Layers
            size={20}
            className={cn([
              'mr-2'
            ])}
          />
          Tech Stack
        </Button>
      </Link>
      {
        !user && (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )
      }
      {
        user && (
          <>
            <Link href="?modal=sign">
              <Button variant="secondary" className="px-3 sm:px-4">
                <span className="block sm:hidden">
                  <SquarePen size={20} />
                </span>
                <span className="hidden sm:block">Sign Guestbook</span>
              </Button>
            </Link>
          </>
        )
      }
      <HeaderDropdown user={user} />
    </div>
  )
}

export default Navigation