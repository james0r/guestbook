"use client"

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function NavLink({
  href,
  children
}: {
  href: string,
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <Link
      className={cn([
        'text-gray-500', ,
        'hover:text-gray-800',
        {
          'font-bold text-black': pathname === href
        }
      ])}
      href={href}>
      {children}
    </Link>
  )
}
