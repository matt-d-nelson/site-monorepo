import { PageWrapperComponent } from '@angular-monorepo/core-ui'
import { Component } from '@angular/core'

@Component({
  selector: 'shared-ui-albums-page',
  standalone: true,
  imports: [PageWrapperComponent],
  templateUrl: './albums-page.component.html',
  styleUrl: './albums-page.component.scss',
})
export class AlbumsPageComponent {}
