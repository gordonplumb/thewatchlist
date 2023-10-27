import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Watchlist'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4 h-screen flex flex-col`}>
        <header className="flex justify-between items-center mb-4 flex-initial">
          <h1 className="text-2xl">The Watchlist</h1>
          <Link className="button" href="/list">
            My List
          </Link>
        </header>
        {children}
      </body>
    </html>
  )
}
