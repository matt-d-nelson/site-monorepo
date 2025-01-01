import { AudioService } from '@angular-monorepo/shared-services'
import { CommonModule } from '@angular/common'
import { Component, input, OnChanges, OnInit, signal } from '@angular/core'
import { Subscription } from 'rxjs'

@Component({
  selector: 'core-ui-audio-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-progress.component.html',
  styleUrl: './audio-progress.component.scss',
})
export class AudioProgressComponent implements OnChanges, OnInit {
  constructor(private audioService: AudioService) {}

  trackId = input.required<string>()
  playing = signal<boolean>(false)
  progress = signal<number>(0)
  private subscription?: Subscription

  ngOnInit(): void {
    this.audioService.progress$.subscribe(progress => {
      this.progress.set(progress.percentage)
    })
  }

  ngOnChanges(): void {
    this.handleSubscription()
  }

  handleSubscription() {
    this.subscription?.unsubscribe()
    this.subscription = this.audioService.currentTrack$.subscribe(
      playingTrack => {
        if (playingTrack?.id !== this.trackId()) {
          this.playing.set(false)
        } else {
          this.playing.set(true)
        }
      }
    )
  }
}
