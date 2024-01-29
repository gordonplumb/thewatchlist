import NextAuth from 'next-auth/next'
import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { WatchlistService } from '../../../services/watchlistService'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (credentials) {
          const service = WatchlistService.GetServerInstance()
          const res = await service.authenticate(credentials.email, credentials.password)
          if (res) {
            return {
              id: res.id,
              name: res.name,
              accessToken: res.token
            }
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60 // 1 hour
  },
  callbacks: {
    async jwt({ token, user, account, profile, session }) {
      if (user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token, user }) {
      if (session?.user) {
        session.accessToken = token.accessToken
        session.user.id = token.sub
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
