"use client"

import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SquarePen, LogIn } from 'lucide-react'
import { signIn } from "next-auth/react"
import HeaderDropdown from '@/components/header-dropdown'
import { useSession } from "next-auth/react"
import Header from './layout/header'

const Navigation = () => {
  const { data: session, status } = useSession()

  return (
    <div className="flex gap-4 items-center">
      <div className="">
        {
          status !== 'authenticated' && (
            <span className="">
              <Button onClick={() => signIn()}>Sign In</Button>
            </span>
          )
        }
      </div>
      {
        status === 'authenticated' && (
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
      <HeaderDropdown />
    </div>
  )
}

export default Navigation