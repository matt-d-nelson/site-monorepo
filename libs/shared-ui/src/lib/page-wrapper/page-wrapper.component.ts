import { BUTTON_TYPES } from '@angular-monorepo/shared-constants'
import { CommonModule } from '@angular/common'
import { Component, input, output, signal } from '@angular/core'
import { ButtonComponent } from '@angular-monorepo/core-ui'
import { NgScrollbarModule } from 'ngx-scrollbar'

@Component({
  selector: 'core-ui-page-wrapper',
  standalone: true,
  imports: [CommonModule, ButtonComponent, NgScrollbarModule],
  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.scss',
})
export class PageWrapperComponent {
  BUTTON_TYPES = signal(BUTTON_TYPES)

  title = input.required<string>()
  userIsAdmin = input<boolean>(false)
  addLabel = input<string>('')
  onAdd = output()
}
