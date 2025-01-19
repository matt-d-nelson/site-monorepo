import { ENV } from '@angular-monorepo/environments'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { BehaviorSubject, finalize, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  _projectCache = new BehaviorSubject<any[]>([])
  projects$ = this._projectCache.asObservable()

  createProject(orgId: string, body: any): Observable<any> {
    return this.http.post(`${ENV.API_URL}/api/code-projects/${orgId}`, body)
  }

  getProjects(orgId: string) {
    this.spinnerService.show()
    this.http
      .get<any[]>(`${ENV.API_URL}/api/code-projects/${orgId}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((projects: any[]) => {
        this._projectCache.next(projects)
      })
  }

  deleteProject(
    orgId: string,
    projId: string,
    imageId: string
  ): Observable<any> {
    this.spinnerService.show()
    return this.http
      .delete(`${ENV.API_URL}/api/code-projects/${orgId}`, {
        params: {
          imageId: imageId,
          projId: projId,
        },
      })
      .pipe(finalize(() => this.spinnerService.hide()))
  }

  updateBio(orgId: string, projId: string, body: any): Observable<any> {
    return this.http.patch(
      `${ENV.API_URL}/api/code-projects/${orgId}/${projId}`,
      body
    )
  }
}
