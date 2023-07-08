import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      username: string
      roles: string[]
      access_token: string
      refresh_token: string
      token_type: string
      expires_in: number
    }
  }

  interface User {
    username: string
    roles: string[]
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
  }
}
