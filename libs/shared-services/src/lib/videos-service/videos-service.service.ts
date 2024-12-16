import { ENV } from '@angular-monorepo/environments'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { BehaviorSubject, finalize } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  _videosCache = new BehaviorSubject<any[]>([])
  videos$ = this._videosCache.asObservable()

  createVideo(orgId: string, body: {}) {
    return this.http.post(`${ENV.API_URL}/api/videos/${orgId}`, body)
  }

  getVideos(orgId: string) {
    this.spinnerService.show()
    this.http
      .get(`${ENV.API_URL}/api/videos/${orgId}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((videos: any) => {
        this._videosCache.next(videos)
      })
  }

  deleteVideo(orgId: string, videoId: string) {
    this.spinnerService.show()
    return this.http
      .delete(`${ENV.API_URL}/api/videos/${orgId}`, {
        params: {
          videoId: videoId,
        },
      })
      .pipe(finalize(() => this.spinnerService.hide()))
  }

  updateVideo(orgId: string, videoId: string, updatedData: any) {
    return this.http.patch(
      `${ENV.API_URL}/api/videos/${orgId}/${videoId}`,
      updatedData
    )
  }
}
