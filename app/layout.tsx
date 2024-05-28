import { Libre_Franklin } from 'next/font/google'
import './styles.css'
import './globals.css'
import SignModal from "@/components/modal/signModal"
import { Suspense } from 'react'

const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
})

export default function Layout({ children }: any) {

  return (
    <html lang="en">
      <body className={libre_franklin.variable}>
        {children}
        <Suspense>
          <SignModal />
        </Suspense>
      </body>
    </html>
  )
}