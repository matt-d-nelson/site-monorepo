import { ENV } from '@angular-monorepo/environments'
import { ORGIDS } from '@angular-monorepo/shared-constants'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { jwtDecode } from 'jwt-decode'
import { finalize, tap } from 'rxjs'
import { DecodedUserToken } from '@angular-monorepo/shared-models'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  registerUser(newUser: any) {
    this.spinnerService.show()
    return this.http
      .post(`${ENV.API_URL}/api/auth/register`, newUser)
      .pipe(finalize(() => this.spinnerService.hide()))
  }

  loginUser(user: any) {
    this.spinnerService.show()
    return this.http.post(`${ENV.API_URL}/api/auth/login`, user).pipe(
      finalize(() => this.spinnerService.hide()),
      tap((res: any) => {
        if (res?.token) {
          localStorage.setItem('jwt_token', res.token)
        }
      })
    )
  }

  isUserAdmin(orgId: ORGIDS): boolean {
    const userToken = localStorage.getItem('jwt_token')
    if (!userToken) return false
    const currentUser: DecodedUserToken | null = this.decodeToken(userToken)
    if (!currentUser) return false
    const currentTime = Math.floor(Date.now() / 1000)
    if (currentUser.exp && currentUser.exp < currentTime) {
      return false
    }

    let isAdmin = false
    currentUser.user.roles.forEach(role => {
      if (role.orgId.id === parseInt(orgId) && role.role === 'admin') {
        isAdmin = true
      }
    })
    return isAdmin
  }

  private decodeToken(token: string): DecodedUserToken | null {
    try {
      return jwtDecode(token)
    } catch (Error) {
      return null
    }
  }
}
