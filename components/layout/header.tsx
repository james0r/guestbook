import { cn } from '@/lib/utils'
import Navigation from '@/components/Navigation'
import { SessionProvider } from "next-auth/react";

export default async function Header() {

  return (
    <header className="flex justify-between items-center bg-gray-900 text-white py-4 px-6">
      <h1 className="text-lg sm:text-2xl font-bold">James&apos; Guestbook</h1>
      <SessionProvider>
        <Navigation />
      </SessionProvider>
    </header>
  )
}