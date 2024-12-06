import { CommonModule } from '@angular/common'
import { Component, input, Input, signal } from '@angular/core'

@Component({
  selector: 'core-ui-lazy-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-img.component.html',
  styleUrl: './lazy-img.component.scss',
})
export class LazyImgComponent {
  source = input.required<string>()
  lazy = input<boolean>(false)
  isLoaded = signal<boolean>(false)

  onImageLoad() {
    this.isLoaded.set(true)
  }
}
