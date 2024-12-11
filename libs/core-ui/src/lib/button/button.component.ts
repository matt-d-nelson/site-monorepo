import { BUTTON_TYPES, CORE_COLORS } from '@angular-monorepo/shared-constants'
import { CommonModule } from '@angular/common'
import { Component, input, output, TemplateRef } from '@angular/core'

@Component({
  selector: 'core-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  BUTTON_TYPES = BUTTON_TYPES
  CORE_COLORS = CORE_COLORS

  type = input<BUTTON_TYPES>(BUTTON_TYPES.TEXT)
  color = input<CORE_COLORS>(CORE_COLORS.PRIMARY)
  textColor = input<string | null>(null)
  hoverTextColor = input<string | null>(null)
  label = input<string | null | undefined>(null)
  icon = input<TemplateRef<any> | null>(null)
  loading = input<boolean | null>(null)

  onClick = output<Event>()
}
