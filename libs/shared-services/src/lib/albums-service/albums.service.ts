import { ENV } from '@angular-monorepo/environments'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { BehaviorSubject, finalize } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) {}

  _albumsCache = new BehaviorSubject<any[]>([])
  albums$ = this._albumsCache.asObservable()

  getAlbums(orgId: string) {
    this.spinnerService.show()
    this.http
      .get(`${ENV.API_URL}/api/albums/${orgId}`)
      .pipe(finalize(() => this.spinnerService.hide()))
      .subscribe((albums: any) => {
        this._albumsCache.next(albums)
      })
  }

  createAlbumDraft(orgId: string) {
    this.spinnerService.show()
    return this.http
      .post(`${ENV.API_URL}/api/albums/draft/${orgId}`, {})
      .pipe(finalize(() => this.spinnerService.hide()))
  }

  publishAlbumDraft(orgId: string, albumId: string, albumData: {}) {
    return this.http.patch(
      `${ENV.API_URL}/api/albums/publish/${orgId}/${albumId}`,
      albumData
    )
  }

  deleteAlbum(orgId: string, albumId: string, imageId?: string) {
    return this.http.delete(`${ENV.API_URL}/api/albums/${orgId}`, {
      params: {
        imageId: imageId || '',
        albumId: albumId,
      },
    })
  }

  getAlbumTracks(albumId: string) {
    return this.http.get(`${ENV.API_URL}/api/albums/tracks/${albumId}`)
  }

  createAlbumTrack(orgId: string, albumId: string, trackData: {}) {
    return this.http.post(
      `${ENV.API_URL}/api/albums/tracks/${orgId}/${albumId}`,
      trackData
    )
  }

  deleteAlbumTrack(orgId: string, trackId: string, audioId: string) {
    return this.http.delete(`${ENV.API_URL}/api/albums/tracks/${orgId}`, {
      params: {
        trackId: trackId,
        audioId: audioId,
      },
    })
  }
}
