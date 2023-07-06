import axios from "axios"
import NextAuth, { AuthOptions } from "next-auth"
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
        const res = await axios.post("http://localhost:8080/auth/login", {
          username: credentials?.username,
          password: credentials?.password,
        })

        const userInfo = await axios.get(
          "http://localhost:8080/api/v1/users/email",
          {
            params: { email: res.data.username },
            headers: { Authorization: `Bearer ${res.data.access_token}` },
          }
        )

        const user = await { ...res.data, ...userInfo.data }

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
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
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
