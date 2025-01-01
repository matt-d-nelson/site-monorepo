import { ENV } from '@angular-monorepo/environments'
import { AboutData } from '@angular-monorepo/shared-models'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { BehaviorSubject, finalize, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  _bioCache = new BehaviorSubject<AboutData[]>([])
  bios$ = this._bioCache.asObservable()

  createBio(orgId: string, body: {}): Observable<any> {
    return this.http.post(`${ENV.API_URL}/api/about/${orgId}`, body)
  }

  getBios(orgId: string) {
    this.spinnerService.show()
    this.http
      .get<AboutData[]>(`${ENV.API_URL}/api/about/${orgId}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((bios: AboutData[]) => {
        this._bioCache.next(bios)
      })
  }

  deleteBio(orgId: string, bioId: string, imageId: string): Observable<any> {
    this.spinnerService.show()
    return this.http
      .delete(`${ENV.API_URL}/api/about/${orgId}`, {
        params: {
          imageId: imageId,
          bioId: bioId,
        },
      })
      .pipe(finalize(() => this.spinnerService.hide()))
  }

  updateBio(orgId: string, bioId: string, body: {}): Observable<any> {
    return this.http.patch(`${ENV.API_URL}/api/about/${orgId}/${bioId}`, body)
  }
}
