import { cn } from '@/lib/utils'
import Navigation from '@/components/layout/header/Navigation'
import { SessionProvider } from "next-auth/react"
import { auth } from '@/auth'
import { Provider } from "@/components/SessionProvider"
import Link from 'next/link'


export default async function Header() {
  const session = await auth()
  // const user = session?.user

  return (
    <header className="flex justify-between items-center bg-gray-900 text-white py-4 px-6">
      <Link href="/">
        <h1 className="text-lg sm:text-2xl font-bold">James&apos; Guestbook</h1>
      </Link>
      <Provider session={session}>
        <Navigation />
      </Provider>
    </header>
  )
}