export interface DecodedUserToken {
    exp: number
    iat: number
    user: {
      email: string
      id: number
      roles: {
        orgId: {
          id: number
          name: string
        },
        role: string
      }[]
    }
  }