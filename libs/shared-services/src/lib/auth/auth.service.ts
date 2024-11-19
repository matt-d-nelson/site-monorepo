import { ENV } from '@angular-monorepo/environments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _currentOrgId = new BehaviorSubject<string>('')
  currentOrgId = this._currentOrgId.asObservable() 

  setCurrentOrg(orgId: any) {
    this._currentOrgId.next(orgId)
  }

  registerUser(newUser: any) {
    return this.http.post(`${ENV.API_URL}/api/auth/register`, newUser)
  }

  loginUser(user: any) {
    return this.http.post(`${ENV.API_URL}/api/auth/login`, user).pipe(
      tap((res: any) => {
        if(res?.token) {
          localStorage.setItem('jwt_token',res.token)
        }
      })
    )
  }
}
