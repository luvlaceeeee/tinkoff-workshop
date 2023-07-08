import axios from "axios"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { signIn, signOut } from "next-auth/react"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.post("http://localhost:8080/auth/login", {
          username: credentials?.username,
          password: credentials?.password,
        })

        // const userInfo = await axios.get(
        //   "http://localhost:8080/api/v1/users/email",
        //   {
        //     params: { email: res.data.username },
        //     headers: { Authorization: `Bearer ${res.data.access_token}` },
        //   }
        // )

        const user = await {
          ...res.data,
          expires_in: Date.now() + res.data.expires_in * 1000,
        }

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!!user) {
        return { ...user }
      } else if (Date.now() < token.expires_in) {
        return token
      } else {
        try {
          const res = await axios.post(
            "http://localhost:8080/auth/access_token",
            new URLSearchParams({
              grant_type: "refresh_token",
              refresh_token: `${token.refresh_token}`,
            })
          )
          const tokens = await res.data
          if (res.status !== 200) throw tokens

          return {
            ...token,
            access_token: tokens.access_token,
            expires_in: Math.floor(Date.now() + tokens.expires_in * 1000),
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          }
        } catch (e) {
          signOut()
          signIn()
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: "bOCUzHTqw5xa+PFn4wFDIk3SSt5wBcveJe2Lp2eqdrQ=",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
