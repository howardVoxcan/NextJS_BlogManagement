'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '../components/app.footer'
import ResponsiveAppBar from '../components/app.header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        
        {/* flex wrapper */}
        <div className="flex flex-col min-h-screen">

          <ResponsiveAppBar />

          {/* content area */}
          <main className="flex-1 container mx-auto px-6 py-10">
            {children}
          </main>

          <Footer />

        </div>

        <ToastContainer position="top-right" />
      </body>
    </html>
  )
}
