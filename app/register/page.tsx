'use client'
import { useRef, useState } from 'react'
import { signUp } from '../services/authService'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const [isDisabled, setIsDisabled] = useState(false)
  const name = useRef('')
  const email = useRef('')
  const password = useRef('')
  const matchingPassword = useRef('')

  const validateInput = () => {
    // todo validation?
    setIsDisabled(password.current != matchingPassword.current)
  }

  const onSubmit = async () => {
    if (!isDisabled) {
      const success = await signUp(name.current, email.current, password.current)
      if (success) {
        signIn('credentials', {
          email: email.current,
          password: password.current,
          redirect: true,
          callbackUrl: '/'
        })
      }
    }
  }

  return (
    <div className="flex flex-col w-80 m-auto max-w-full">
      {
        [
          { label: 'Name', valueRef: name, inputType: 'text' },
          { label: 'Email', valueRef: email, inputType: 'text' },
          { label: 'Password', valueRef: password, inputType: 'password' },
          { label: 'Re-enter Password', valueRef: matchingPassword, inputType: 'password' }
        ].map(item => (<>
          {item.label === 'Password' ? <>
            <p className="secondaryText">
              Your password must:<br/>
              Be between 8-24 characters long.<br/>
              Contain an uppercase letter, a lowercase letter, a number, and a symbol.<br/>
              Have no spaces.
            </p>
          </> : ''}
          <label className="label-small">{item.label}</label>
          <input
            type={item.inputType}
            className="border border-slate-300 bg-transparent rounded px-2 py-1 mb-2 outline-none focus-within:border-slate-100"
            placeholder={`${item.label}...`}
            onChange={(e) => {
              item.valueRef.current = e.target.value
              validateInput()
            }}
          />
        </>))
      }
      <button
        className="button primary button-max mb-4"
        disabled={isDisabled}
        onClick={onSubmit}
      >
        Sign Up
      </button>
    </div>
  )
}
