import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './components/Provider'
import Navbar from './components/Navbar'
import React from 'react'
import { BASE_API_URL } from '@/utils/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Auth',
  description: 'Nextjs with Prisma and next-auth',
}

export default function RootLayout({ children }) {
  if (!BASE_API_URL) {
    return
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
