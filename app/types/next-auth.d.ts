 
import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | null
    image?: string | null
    isAdmin: boolean
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      emailVerified?: Date | null
      image?: string | null
      isAdmin: boolean
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | null
    picture?: string | null
    isAdmin: boolean
  }
}

 