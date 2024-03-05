import NextAuth from 'next-auth/next'
import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 40000
      },
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        const res = await fetch(
          `${process.env.PUBLIC_BACKEND_URL}/api/auth/authenticate`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${account.id_token}`
            }
          }
        )
        const resJson = await res.json()
        token = Object.assign({}, token, {
          id_token: account.id_token,
          accessToken: resJson.token,
          id: resJson.id
        })
      }

      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.accessToken = token.accessToken
        session.user.gId = token.sub
        session.user.id = token.id
      }

      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
