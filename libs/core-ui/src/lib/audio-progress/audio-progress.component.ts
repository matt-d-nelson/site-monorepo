import { AudioService } from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { Component, input, OnInit, signal } from '@angular/core'

@Component({
  selector: 'core-ui-audio-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-progress.component.html',
  styleUrl: './audio-progress.component.scss',
})
export class AudioProgressComponent implements OnInit {
  constructor(private audioService: AudioService) {}

  trackId = input.required<any>()
  playing = signal<boolean>(false)
  progress = signal<number>(0)

  ngOnInit(): void {
    this.audioService.currentTrack$.subscribe(playingTrack => {
      if (playingTrack?.id !== this.trackId()) {
        this.playing.set(false)
      } else {
        this.playing.set(true)
      }
    })
    this.audioService.progress$.subscribe(progress => {
      this.progress.set(progress.percentage)
    })
  }
}
