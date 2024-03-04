'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const signInGoogle = () => {
  signIn('google', {
    redirect: true,
    callbackUrl: '/'
  })
}

export function SignInButton() {
  const { data } = useSession()

  return data?.user? (
    <button className="button" onClick={() => signOut()}>
      Sign Out
    </button>
  ) :
  (
    <button className="button button-max" onClick={signInGoogle}>
      Sign In With Google
    </button>
  )
}
