import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import NavLink from './NavLink'
import { signOut } from "next-auth/react"
import SignoutButton from '@/components/auth/SignoutButton'
import { Button } from '@/components/ui/Button'

export default function DashboardLayout({
  title,
  description,
  children
}: {
  title: string,
  description?: string,
  children: React.ReactNode
}) {
  return (
    <div className='container mx-auto p-6 sm:p-12'>
      <div className={cn([
        'md:flex',
      ])}>
        <div className={cn([
          'md:w-[10rem]',
          'mb-5'
        ])}>
          <nav>
            <Button className="mb-4">
              <Link href='/'>
                Guestbook
              </Link>
            </Button>
            <h2 className={cn([
              'text-lg',
              'font-bold',
              'mb-4'
            ])}>
              Navigation
            </h2>
            <ul className={cn([
              'flex',
              'items-center',
              'md:block',
              'space-y-0',
              'md:space-y-2',
              'space-x-2',
              'md:space-x-0'
            ])}>
              <li>
                <NavLink href="/dashboard">Overview</NavLink>
              </li>
              <li>
                <NavLink href="/dashboard/profile">Profile</NavLink>
              </li>
              <li>
                <NavLink href="/dashboard/settings">Settings</NavLink>
              </li>
              <li>
                <SignoutButton className={
                  cn([
                    'text-gray-500',
                    'hover:text-gray-800'
                  ])
                }
                >
                  Sign out
                </SignoutButton>
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-full">
          <header className="mb-6">
            <div className="text-3xl font-bold mb-2">
              {title}
            </div>
            {
              description && (
                <p>
                  {description}
                </p>
              )
            }
          </header>
          {children}
        </div>
      </div>
    </div>
  )
}