import { LazyImgComponent } from '@angular-monorepo/core-ui'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'shared-ui-home-page',
  standalone: true,
  imports: [LazyImgComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  @Input() homeImg!: string
}
