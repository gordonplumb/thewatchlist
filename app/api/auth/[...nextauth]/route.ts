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
        console.log('jwt')
        const resJson = await res.json()
        console.log(resJson)
        token = Object.assign({}, token, {
          id_token: account.id_token,
          accessToken: resJson.token
        })
        console.log(token)
      }

      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.accessToken = token.accessToken
        session.user.id = token.sub
        console.log(session)
      }

      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
