import { Libre_Franklin } from 'next/font/google'
import './styles.css'
import './globals.css'
import SignGuestbookModal from "@/components/modals/SignGuestbookModal"
import { Suspense } from 'react'
import { auth } from '@/auth'

const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
})

export default async function Layout({ children }: any) {
  // const session = getSession()

  const session = await auth()

  return (
    <html lang="en">
      <body className={libre_franklin.variable}>
        {children}
        <Suspense>
          <SignGuestbookModal session={session} />
        </Suspense>
        {/* <SessionConsumer session={session} /> */}
      </body>
    </html>
  )
}