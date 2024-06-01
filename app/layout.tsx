import { Libre_Franklin } from 'next/font/google'
import './styles.css'
import './globals.css'
import SignGuestbookModal from "@/components/modals/SignGuestbookModal"
import { Suspense } from 'react'
import { SessionProvider } from "next-auth/react";
import SessionConsumer from '@/components/SessionConsumer'
// import { getSession } from 'next-auth/react'

const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
})

export default function Layout({ children }: any) {
  // const session = getSession()

  return (
    <html lang="en">
      <body className={libre_franklin.variable}>
        {children}
        <Suspense>
          <SessionProvider>
            <SignGuestbookModal />
          </SessionProvider>
        </Suspense>
        {/* <SessionConsumer session={session} /> */}
      </body>
    </html>
  )
}