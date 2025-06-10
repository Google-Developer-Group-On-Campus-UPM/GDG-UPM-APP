import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import Image from 'next/image'
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

    <html lang="en" className='dark'>
      <>
        <body className={inter.className + " dark:bg-black"}>
          <div className="fixed w-full h-full top-0 left-0 -z-10 dark:bg-black">
            <Image
              src="/images/Main.webp"
              alt=""
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              priority
              style={{ filter: 'brightness(1.2)' }} 
            ></Image>
          </div>
          {children}

        </body>
      </>
    </html>
  )
}