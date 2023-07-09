import NextAuth from "next-auth"

import { authOptions } from "@/config/authOptions"

export const dynamic = "force-dynamic"
export const revalidate = false

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
