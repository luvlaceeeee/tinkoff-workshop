import "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username: string
      roles: string[]
      access_token: string
      refresh_token: string
      token_type: string
      expires_in: number
    }
  }
}
