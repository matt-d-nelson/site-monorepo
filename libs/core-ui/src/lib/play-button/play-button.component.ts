import { CORE_COLORS } from '@angular-monorepo/shared-constants'
import { Component, input, OnChanges, OnDestroy, signal } from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import { CommonModule } from '@angular/common'
import { AudioService } from '@angular-monorepo/shared-services'
import { combineLatest, Subscription } from 'rxjs'

@Component({
  selector: 'core-ui-play-button',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
})
export class PlayButtonComponent implements OnChanges, OnDestroy {
  constructor(private audioService: AudioService) {}

  CORE_COLORS = CORE_COLORS
  color = input<CORE_COLORS>(CORE_COLORS.PRIMARY)
  // svg needs unique animation id
  id = input.required<string>()
  track = input.required<any>()
  album = input()
  playing = signal<boolean>(false)
  private subscription?: Subscription

  ngOnChanges(): void {
    this.handleSubscription()
  }

  handleSubscription() {
    this.subscription?.unsubscribe()
    this.subscription = combineLatest([
      this.audioService.isPlaying$,
      this.audioService.currentTrack$,
    ]).subscribe(([isPlaying, currentTrack]) => {
      const isCurrentTrack = currentTrack?.id === this.track()?.id
      this.playing.set(isCurrentTrack && isPlaying)
    })
  }

  togglePlaying() {
    if (!this.playing()) {
      this.audioService.play(this.track())
      if (this.album()) {
        this.audioService.setCurrentAlbum(this.album())
      }
    } else {
      this.audioService.pause()
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
