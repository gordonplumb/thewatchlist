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
              id: res.userId,
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
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
