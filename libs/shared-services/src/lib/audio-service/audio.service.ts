import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  private audio: HTMLAudioElement
  private _currentAlbum = new BehaviorSubject<any>(null)
  currentAlbum$ = this._currentAlbum.asObservable()
  private _currentTrack = new BehaviorSubject<any | null>(null)
  currentTrack$ = this._currentTrack.asObservable()
  private _isPlaying = new BehaviorSubject<boolean>(false)
  isPlaying$ = this._isPlaying.asObservable()
  private _progress = new BehaviorSubject({
    currentTime: 0,
    duration: 0,
    percentage: 0,
  })
  progress$ = this._progress.asObservable()

  constructor() {
    this.audio = new Audio()
    this.audio.addEventListener('ended', () => {
      this.handleTrackEnded()
    })
    this.audio.addEventListener('loadedmetadata', () => {
      this.updateProgress()
    })
    this.audio.addEventListener('timeupdate', () => {
      this.updateProgress()
    })
    this.audio.addEventListener('error', error => {
      this._isPlaying.next(false)
    })
  }

  private updateProgress() {
    this._progress.next({
      currentTime: this.audio.currentTime,
      duration: this.audio.duration || 0,
      percentage: (this.audio.currentTime / (this.audio.duration || 1)) * 100,
    })
  }

  handleTrackEnded() {
    const album = this._currentAlbum.value
    if (!album) {
      this._currentTrack.next(null)
      this._isPlaying.next(false)
    }
    const currentTrackIdx = album.tracks.findIndex((track: any) => {
      return track?.id === this._currentTrack.value?.id
    })
    const nextTrack = album.tracks[currentTrackIdx + 1]
    if (nextTrack && currentTrackIdx !== -1) {
      this.play(nextTrack)
    } else {
      this._currentTrack.next(null)
      this._currentAlbum.next(null)
      this._isPlaying.next(false)
    }
  }

  setCurrentAlbum(album: any) {
    this._currentAlbum.next(album)
  }

  play(track: any) {
    this._isPlaying.next(true)
    if (!this._currentTrack.value || this._currentTrack.value.id !== track.id) {
      this.audio.src = track.audioUrl
      this._currentTrack.next(track)
    }
    this.audio.play().catch(error => {
      console.error(error)
      this._isPlaying.next(false)
    })
  }

  pause() {
    this._isPlaying.next(false)
    this.audio.pause()
  }
}
