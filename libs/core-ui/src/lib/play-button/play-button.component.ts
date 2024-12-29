import { CORE_COLORS } from '@angular-monorepo/shared-constants'
import { Component, input, output, signal } from '@angular/core'
import { ButtonComponent } from '../button/button.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'core-ui-play-button',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.scss',
})
export class PlayButtonComponent {
  CORE_COLORS = CORE_COLORS
  // svg needs unique animation id
  id = input.required<string>()
  // TODO: pass in album and track

  color = input<CORE_COLORS>(CORE_COLORS.PRIMARY)
  onClick = output<Event>()

  playing = signal<boolean>(false)
  
  togglePlaying() {
    this.playing.set(!this.playing())
    this.onClick.emit(new Event('click'))
  }

  // TODO: I think these will tap into the audio service and manage their state from there

}
