import { Button } from "@/components/ui/button"
import Link from "next/link"
import FetchedData from '@/components/fetchedData'
import CreatedAtDate from '@/components/createdAtDate'
import { getGuestsDesc } from '@/db/queries'
import { SquarePen, LogIn } from 'lucide-react';

export const fetchCache = 'force-no-store'

export default async function Page() {
  const guests = await getGuestsDesc()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex justify-between items-center bg-gray-900 text-white py-4 px-6">
        <h1 className="text-lg sm:text-2xl font-bold">James&apos; Guestbook</h1>
        <div className="flex gap-2">
          <Link href="?modal=sign" className="">
            <Button className="hover:text-white/80">
              <span className="block sm:hidden">
                <LogIn size={20} />
              </span>
              <span className="hidden sm:block">Sign in</span>
            </Button>
          </Link>
          <Link href="?modal=sign">
            <Button variant="secondary" className="px-3 sm:px-4">
              <span className="block sm:hidden">
                <SquarePen size={20} />
              </span>
              <span className="hidden sm:block">Sign guestbook</span>
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 py-8 px-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date & Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Comment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {
                  guests && guests.map((guest) => (
                    <tr key={guest.id}>
                      <td className="px-4 py-3 text-sm text-gray-900">{guest.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900"><CreatedAtDate timestamp={guest.created_at}></CreatedAtDate></td>
                      <td className="px-4 py-3 text-sm break-words max-w-40">
                        {guest.comment}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <FetchedData />
        <span className="text-xs sm:text-sm tracking-wide">
          Made by <a href="https://jamesauble.com" target="_blank" className="underline">JamesAuble</a>
        </span>
      </footer>
    </div>
  )
}
