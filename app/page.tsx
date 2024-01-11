'use client'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data } = useSession() 
  return <>
    {data?.user ? <h2>Welcome, {data.user.name}</h2> : ''}
  </>
}
