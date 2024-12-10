import { ENV } from '@angular-monorepo/environments'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  _bioCache = new BehaviorSubject<any[]>([])
  bios$ = this._bioCache.asObservable()

  createBio(orgId: string, body: {}): Observable<any> {
    this.spinnerService.show()
    return this.http
      .post(`${ENV.API_URL}/api/about/${orgId}`, body)
      .pipe(finalize(() => this.spinnerService.hide()))
  }

  getBios(orgId: string) {
    this.spinnerService.show()
    this.http
      .get(`${ENV.API_URL}/api/about/${orgId}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((bios: any) => {
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
    this.spinnerService.show()
    return this.http
      .patch(`${ENV.API_URL}/api/about/${orgId}/${bioId}`, body)
      .pipe(finalize(() => this.spinnerService.hide()))
  }
}
