import { ENV } from '@angular-monorepo/environments'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { OrgService } from '../org-service/org.service'

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private http: HttpClient) {}

  createBio(orgId: string, body: {}): Observable<any> {
    return this.http.post(`${ENV.API_URL}/api/about/${orgId}`, body)
  }
}
