import { ENV } from '@angular-monorepo/environments'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  _bioCache = new BehaviorSubject<any[]>([])
  bios$ = this._bioCache.asObservable()

  createBio(orgId: string, body: {}): Observable<any> {
    return this.http.post(`${ENV.API_URL}/api/about/${orgId}`, body)
  }

  getBios(orgId: string) {
    this.http.get(`${ENV.API_URL}/api/about/${orgId}`).subscribe((bios: any) => {
      this._bioCache.next(bios)
    })
  }

  deleteBio(orgId: string, bioId: string, imageId: string): Observable<any> {
    return this.http.delete(`${ENV.API_URL}/api/about/${orgId}`, {
      params: {
        imageId: imageId,
        bioId: bioId
      }
    })
  }

  updateBio(orgId: string, bioId: string, body: {}): Observable<any> {
    return this.http.patch(`${ENV.API_URL}/api/about/${orgId}/${bioId}`, body)
  }
}
