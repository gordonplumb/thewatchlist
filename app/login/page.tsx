'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function LoginPage() {
  const [isDisabled, setIsDisabled] = useState(true)
  const email = useRef('')
  const password = useRef('')

  const onSubmit = () => {
    if (!isDisabled) {
      signIn('credentials', {
        email: email.current,
        password: password.current,
        redirect: true,
        callbackUrl: '/'
      })
    } 
  }

  const signInGoogle = () => {
    signIn('google', {
      redirect: true,
      callbackUrl: '/'
    })
  }

  const validateInput = () => {
    setIsDisabled(!(email.current && password.current))
  }

  return (
    <div className="flex flex-col w-80 m-auto max-w-full">
      <label>Email</label>
      <input
        type="text"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 mb-1 outline-none focus-within:border-slate-100"
        placeholder="Email..."
        onChange={(e) => {
          email.current = e.target.value
          validateInput()
        }}
      />
      <label>Password</label>
      <input
        type="password"
        className="border border-slate-300 bg-transparent rounded px-2 py-1 mb-2 outline-none focus-within:border-slate-100"
        placeholder="Password..."
        onChange={(e) => {
          password.current = e.target.value
          validateInput()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit()
          }
        }}
      />
      <button
        className="button primary button-max mb-4"
        disabled={isDisabled}
        onClick={onSubmit}
      >
        Sign In
      </button>
      <button
        className="button primary button-max mb-4"
        onClick={signInGoogle}
      >
        Sign In With Google
      </button>
      <hr className="bg-slate-500 text-slate-500 border-0 rounded h-0.5 w-11/12 self-center mb-4"/>
      <Link className="button primary button-max" href="register">
        Sign Up
      </Link>
    </div>
  );
}
