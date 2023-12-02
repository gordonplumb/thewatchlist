import NextAuth from "next-auth/next"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import {authenticate} from "../../../services/authService"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "text"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials, req) {
        if (credentials) {
          const res = await authenticate(credentials.email, credentials.password)
          if (res) {
            return {id: res.userId}
          }
        }

        return null
      }
    })
  ],
  session: {strategy: "jwt"}
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
