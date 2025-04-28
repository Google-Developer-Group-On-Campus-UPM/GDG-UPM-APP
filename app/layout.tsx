import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GDG UPM',
  description: 'Google Developer Group Universiti Putra Malaysia',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <>
        <body className={inter.className + " dark:bg-gray-900"}>

          {children}

        </body>
      </>
    </html>
  )
}