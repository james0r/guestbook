"use client"

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { SquarePen, LogIn } from 'lucide-react'
import { signIn } from "next-auth/react"
import HeaderDropdown from '@/components/layout/header/HeaderDropdown'
import { useSession } from "next-auth/react"

const Navigation = () => {
  const { data: session, status } = useSession()
  const user = session?.user

  return (
    <div className="flex gap-4 items-center">
      <div className="">
        {
          !user && (
            <span className="">
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
            </span>
          )
        }
      </div>
      {
        user && (
          <>
            <Link href="?modal=sign">
              <Button variant="secondary" className="px-3 sm:px-4">
                <span className="block sm:hidden">
                  <SquarePen size={20} />
                </span>
                <span className="hidden sm:block">Sign guestbook</span>
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