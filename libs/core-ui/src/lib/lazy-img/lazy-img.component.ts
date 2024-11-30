import { CommonModule } from '@angular/common'
import { Component, Input, signal } from '@angular/core'

@Component({
  selector: 'core-ui-lazy-img',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-img.component.html',
  styleUrl: './lazy-img.component.scss',
})
export class LazyImgComponent {
  @Input() source: string = ''
  @Input() skeleton: boolean = false
  @Input() lazy: boolean = false

  isLoaded = signal<boolean>(false)

  onImageLoad() {
    this.isLoaded.set(true)
  }
}
