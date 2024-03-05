import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { authOptions } from './api/auth/[...nextauth]/route'
import Provider from './context/client-provider'
import { SignInButton } from './components/SignInButton'
import { WatchlistService } from './services/watchlistService'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Watchlist'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4 h-screen flex flex-col`}>
        <Provider session={session}>
          <header className="flex justify-between items-center mb-4 flex-initial">
            <Link href={'/'}>
              <h1 className="text-2xl">The Watchlist</h1>
            </Link>
            <div className="flex">
              {session?.user ? (
                <Link className="button block mr-1" href={`/lists/${session.user.id}`}>
                  My Lists
                </Link>  
              ) : ''}
              <SignInButton />
            </div>
          </header>
          {children}
          <footer className='mt-auto text-center'>
            <div>
              <a href='/about'>About</a>
            </div>
          </footer>
        </Provider>
      </body>
    </html>
  )
}
