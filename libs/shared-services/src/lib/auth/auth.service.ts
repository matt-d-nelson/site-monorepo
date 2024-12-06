import { ENV } from '@angular-monorepo/environments'
import { ORGIDS } from '@angular-monorepo/shared-constants'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { jwtDecode } from 'jwt-decode'
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs'

interface DecodedUserToken {
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(newUser: any) {
    return this.http.post(`${ENV.API_URL}/api/auth/register`, newUser)
  }

  loginUser(user: any) {
    return this.http.post(`${ENV.API_URL}/api/auth/login`, user).pipe(
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('jwt_token', res.token)
        }
      })
    )
  }

  isUserAdmin(orgId: ORGIDS): boolean {
    const userToken = localStorage.getItem('jwt_token')
    console.log(userToken)
    if(!userToken) return false
    const currentUser: DecodedUserToken | null = this.decodeToken(userToken)
    console.log(currentUser)
    if(!currentUser) return false

    let isAdmin = false
    currentUser.user.roles.forEach((role) => {
      if(role.orgId.id === parseInt(orgId) && role.role === 'admin') {
        isAdmin = true
      }
    })
    return isAdmin
  }

  private decodeToken(token: string): DecodedUserToken | null {
    try {
      return jwtDecode(token)
    } catch(Error) {
      return null
    }
  }
}
