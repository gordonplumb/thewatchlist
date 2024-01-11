import NextAuth, { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string & DefaultSession
  }

  interface User {
    accessToken: string & DefaultUser
  }
}
