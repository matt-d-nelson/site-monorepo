import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ENV } from '@angular-monorepo/environments'

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) {}

  getFeed() {
    return this.http.get(`${ENV.API_URL}/api/feed`)
  }
}
