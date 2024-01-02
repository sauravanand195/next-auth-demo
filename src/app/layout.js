import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './components/Provider'
import Navbar from './components/Navbar'
import React from 'react'
// import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Next Auth',
  description: 'Nextjs with Prisma and next-auth',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Provider>
          {children}
        </Provider>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
