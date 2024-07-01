import CreatedAtDate from '@/components/CreatedAtDate'
import { getGuestsDesc } from '@/db/queries/guest'

import Header from '@/components/layout/header/Header'
import Footer from '@/components/layout/Footer'

export default async function Page() {
  const guests = await getGuestsDesc()

  return (
    <div className="flex flex-col min-h-[100svh]">
      <Header />
      <main className="flex-1 bg-gray-100 py-8 px-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-7xl mx-auto">
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
      <Footer />
    </div>
  )
}
