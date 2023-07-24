import { redirect } from "next/navigation"
import axios from "axios"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.post(`${process.env.AUTH_URL}/login`, {
          username: credentials?.username,
          password: credentials?.password,
        })

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
        // @ts-ignore
      } else if (Date.now() < token.expires_in) {
        return token
      } else {
        try {
          const res = await axios.post(
            `${process.env.AUTH_URL}/access_token`,
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
          console.log("error")
          redirect("/")
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: "bOCUzHTqw5xa+PFn4wFDIk3SSt5wBcveJe2Lp2eqdrQ=",
}
