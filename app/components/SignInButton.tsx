'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export function SignInButton() {
  const { data } = useSession()

  return data?.user? (
    <button className="button" onClick={() => signOut()}>
      Sign Out
    </button>
  ) :
  (
    <Link className="button" href="/login">
      Sign In
    </Link>
  )
}
