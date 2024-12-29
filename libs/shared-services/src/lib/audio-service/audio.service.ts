import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
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
    percentage: 0
  })
  progress$ = this._progress.asObservable()

  constructor() { 
    this.audio = new Audio()
    this.audio.addEventListener('ended', () => {
      // move to next idx of albumTracks
      this._isPlaying.next(false)
    })
    this.audio.addEventListener('loadedmetadata', () => {
      this.updateProgress()
    })
    this.audio.addEventListener('timeupdate', () => {
      this.updateProgress()
    })
    this.audio.addEventListener('error', (error) => {
      this._isPlaying.next(false)
    })
  }

  private updateProgress() {
    this._progress.next({
      currentTime: this.audio.currentTime,
      duration: this.audio.duration || 0,
      percentage: (Math.floor(this.audio.currentTime / (this.audio.duration || 1)) * 100 )
    })
  }

  play(track: any) {
    if(!this._currentTrack.value || this._currentTrack.value.id !== track.id) {
      this.audio.src = track.audioUrl
      this._currentTrack.next(track)
    }

    this.audio.play().then(() => {
      this._isPlaying.next(true)
    })
    .catch((error) => {
      console.error(error)
      this._isPlaying.next(false)
    })
  }

  pause() {
    this.audio.pause()
    this._isPlaying.next(false)
  }
}
