import { CORE_COLORS } from '@angular-monorepo/shared-constants'
import { Component, input, OnInit, output, signal } from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import { CommonModule } from '@angular/common'
import { AudioService } from '@angular-monorepo/shared-services'

@Component({
  selector: 'core-ui-play-button',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
})
export class PlayButtonComponent implements OnInit {
  constructor(private audioService: AudioService) {}

  CORE_COLORS = CORE_COLORS
  color = input<CORE_COLORS>(CORE_COLORS.PRIMARY)
  // svg needs unique animation id
  id = input.required<string>()
  track = input.required<any>()
  album = input()
  playing = signal<boolean>(false)

  ngOnInit(): void {
    this.audioService.currentTrack$.subscribe(playingTrack => {
      if (playingTrack?.id !== this.track()?.id) {
        this.playing.set(false)
      } else {
        this.playing.set(true)
      }
    })
  }

  togglePlaying() {
    this.playing.set(!this.playing())
    if (this.playing()) {
      this.audioService.play(this.track())
      if (this.album()) {
        this.audioService.setCurrentAlbum(this.album())
      }
    } else {
      this.audioService.pause()
    }
  }
}
