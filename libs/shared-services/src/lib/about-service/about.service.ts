import { ENV } from '@angular-monorepo/environments'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, Observable, of } from 'rxjs'

function errorPipe() {
  return catchError(error => {
    console.error(error)
    return of(null)
  })
}

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  _bioCache = new BehaviorSubject<any[]>([])
  bios$ = this._bioCache.asObservable()

  _loadingBios = new BehaviorSubject<boolean>(false)
  loadingBios$ = this._loadingBios.asObservable

  createBio(orgId: string, body: {}): Observable<any> {
    return this.http.post(`${ENV.API_URL}/api/about/${orgId}`, body)
  }

  getBios(orgId: string) {
    this._loadingBios.next(true)
    this.http
      .get(`${ENV.API_URL}/api/about/${orgId}`)
      .pipe(errorPipe())
      .subscribe((bios: any) => {
        this._bioCache.next(bios)
        this._loadingBios.next(false)
      })
  }

  deleteBio(orgId: string, bioId: string, imageId: string): Observable<any> {
    return this.http
      .delete(`${ENV.API_URL}/api/about/${orgId}`, {
        params: {
          imageId: imageId,
          bioId: bioId,
        },
      })
      .pipe(errorPipe())
  }

  updateBio(orgId: string, bioId: string, body: {}): Observable<any> {
    return this.http
      .patch(`${ENV.API_URL}/api/about/${orgId}/${bioId}`, body)
      .pipe(errorPipe())
  }
}
